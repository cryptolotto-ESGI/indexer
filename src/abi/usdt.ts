import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    LotteryCreated: event("0x9cfcfa237608bb025928c0e3678b36d461d5937c66d7122dcf4c886d6ff336af", "LotteryCreated(uint256,address,uint256,uint256,string)", {"lotteryId": indexed(p.uint256), "owner": indexed(p.address), "minLaunchDate": p.uint256, "ticketPrice": p.uint256, "description": p.string}),
    LotteryLaunched: event("0xd1361514e95834459a6421529064ca67ca0509e9bcd566d2191590ada89f4310", "LotteryLaunched(uint256,address,uint256)", {"lotteryId": indexed(p.uint256), "winner": indexed(p.address), "endDate": p.uint256}),
    TicketPurchased: event("0x785f2865353ae960010300f584fc6c577b757a853af69a99c769df3c8232d3de", "TicketPurchased(uint256,address)", {"lotteryId": indexed(p.uint256), "buyer": indexed(p.address)}),
}

export const functions = {
    buyTicket: fun("0x67dd74ca", "buyTicket(uint256)", {"_lotteryId": p.uint256}, ),
    cancelLottery: fun("0x4538f297", "cancelLottery(uint256)", {"_lotteryId": p.uint256}, ),
    createLottery: fun("0x7f9047e6", "createLottery(uint256,uint256,string)", {"_minLaunchDate": p.uint256, "_ticketPriceInGwei": p.uint256, "_description": p.string}, ),
    getLotteries: viewFun("0xbcc82ec4", "getLotteries()", {}, p.array(p.struct({"id": p.uint256, "owner": p.address, "minLaunchDate": p.uint256, "endDate": p.uint256, "ticketPrice": p.uint256, "description": p.string, "tickets": p.array(p.struct({"buyer": p.address, "purchaseDate": p.uint256})), "winner": p.address, "isActive": p.bool}))),
    getWinner: viewFun("0x4129b2c9", "getWinner(uint256)", {"_lotteryId": p.uint256}, p.address),
    isUserInLottery: viewFun("0x28ebdd9b", "isUserInLottery(uint256,address)", {"_lotteryId": p.uint256, "_user": p.address}, p.bool),
    launchLottery: fun("0x98459fe0", "launchLottery(uint256)", {"_lotteryId": p.uint256}, ),
    lotteries: viewFun("0x1398e076", "lotteries(uint256)", {"_0": p.uint256}, {"id": p.uint256, "owner": p.address, "minLaunchDate": p.uint256, "endDate": p.uint256, "ticketPrice": p.uint256, "description": p.string, "winner": p.address, "isActive": p.bool}),
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

