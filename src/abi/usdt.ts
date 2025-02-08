import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    LotteryCreated: event("0x58da588946e8e99318cd4696aa161f4fcdda530d97eaf2de679d7b90e0869e29", "LotteryCreated(uint256,address,uint256,uint256)", {"lotteryId": indexed(p.uint256), "owner": indexed(p.address), "minLaunchDate": p.uint256, "ticketPrice": p.uint256}),
    LotteryLaunched: event("0x14218c04536f37e04c68bb127688e6568fa5e6166a55f0d23a1a813723d555b6", "LotteryLaunched(uint256,address)", {"lotteryId": indexed(p.uint256), "winner": indexed(p.address)}),
    TicketPurchased: event("0x785f2865353ae960010300f584fc6c577b757a853af69a99c769df3c8232d3de", "TicketPurchased(uint256,address)", {"lotteryId": indexed(p.uint256), "buyer": indexed(p.address)}),
}

export const functions = {
    buyTicket: fun("0x67dd74ca", "buyTicket(uint256)", {"_lotteryId": p.uint256}, ),
    cancelLottery: fun("0x4538f297", "cancelLottery(uint256)", {"_lotteryId": p.uint256}, ),
    createLottery: fun("0xfe35804e", "createLottery(uint256,uint256)", {"_minLaunchDate": p.uint256, "_ticketPriceInGwei": p.uint256}, ),
    getLotteries: viewFun("0xbcc82ec4", "getLotteries()", {}, p.array(p.struct({"id": p.uint256, "owner": p.address, "minLaunchDate": p.uint256, "ticketPrice": p.uint256, "players": p.array(p.address), "winner": p.address, "isActive": p.bool}))),
    getWinner: viewFun("0x4129b2c9", "getWinner(uint256)", {"_lotteryId": p.uint256}, p.address),
    isUserInLottery: viewFun("0x28ebdd9b", "isUserInLottery(uint256,address)", {"_lotteryId": p.uint256, "_user": p.address}, p.bool),
    launchLottery: fun("0x98459fe0", "launchLottery(uint256)", {"_lotteryId": p.uint256}, ),
    lotteries: viewFun("0x1398e076", "lotteries(uint256)", {"_0": p.uint256}, {"id": p.uint256, "owner": p.address, "minLaunchDate": p.uint256, "ticketPrice": p.uint256, "winner": p.address, "isActive": p.bool}),
    lotteryCount: viewFun("0xc6f6d9d9", "lotteryCount()", {}, p.uint256),
}

export class Contract extends ContractBase {

    getLotteries() {
        return this.eth_call(functions.getLotteries, {})
    }

    getWinner(_lotteryId: GetWinnerParams["_lotteryId"]) {
        return this.eth_call(functions.getWinner, {_lotteryId})
    }

    isUserInLottery(_lotteryId: IsUserInLotteryParams["_lotteryId"], _user: IsUserInLotteryParams["_user"]) {
        return this.eth_call(functions.isUserInLottery, {_lotteryId, _user})
    }

    lotteries(_0: LotteriesParams["_0"]) {
        return this.eth_call(functions.lotteries, {_0})
    }

    lotteryCount() {
        return this.eth_call(functions.lotteryCount, {})
    }
}

/// Event types
export type LotteryCreatedEventArgs = EParams<typeof events.LotteryCreated>
export type LotteryLaunchedEventArgs = EParams<typeof events.LotteryLaunched>
export type TicketPurchasedEventArgs = EParams<typeof events.TicketPurchased>

/// Function types
export type BuyTicketParams = FunctionArguments<typeof functions.buyTicket>
export type BuyTicketReturn = FunctionReturn<typeof functions.buyTicket>

export type CancelLotteryParams = FunctionArguments<typeof functions.cancelLottery>
export type CancelLotteryReturn = FunctionReturn<typeof functions.cancelLottery>

export type CreateLotteryParams = FunctionArguments<typeof functions.createLottery>
export type CreateLotteryReturn = FunctionReturn<typeof functions.createLottery>

export type GetLotteriesParams = FunctionArguments<typeof functions.getLotteries>
export type GetLotteriesReturn = FunctionReturn<typeof functions.getLotteries>

export type GetWinnerParams = FunctionArguments<typeof functions.getWinner>
export type GetWinnerReturn = FunctionReturn<typeof functions.getWinner>

export type IsUserInLotteryParams = FunctionArguments<typeof functions.isUserInLottery>
export type IsUserInLotteryReturn = FunctionReturn<typeof functions.isUserInLottery>

export type LaunchLotteryParams = FunctionArguments<typeof functions.launchLottery>
export type LaunchLotteryReturn = FunctionReturn<typeof functions.launchLottery>

export type LotteriesParams = FunctionArguments<typeof functions.lotteries>
export type LotteriesReturn = FunctionReturn<typeof functions.lotteries>

export type LotteryCountParams = FunctionArguments<typeof functions.lotteryCount>
export type LotteryCountReturn = FunctionReturn<typeof functions.lotteryCount>

