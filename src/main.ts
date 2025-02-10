import {DataHandlerContext, EvmBatchProcessor, Log} from "@subsquid/evm-processor";
import * as usdtAbi from './abi/usdt'
import {Store, TypeormDatabase} from "@subsquid/typeorm-store";
import {config} from "dotenv";
import {Lottery, Ticket} from "./model";


config();

const processor = new EvmBatchProcessor()
    .setGateway(process.env.GATEWAY)
    .setRpcEndpoint({
        url: process.env.RPC_ETH_HTTP,
        rateLimit: 10
    })
    .setFinalityConfirmation(75)
    .addLog({
        address: [process.env.SMART_CONTRACT_ADDRESS],
        topic0: [
            usdtAbi.events.LotteryCreated.topic,
            usdtAbi.events.TicketPurchased.topic,
            usdtAbi.events.LotteryLaunched.topic,
        ],
    }).setBlockRange({
        from: 48112200
    })

export const db = new TypeormDatabase();

processor.run(db, async ctx => {
    for (let block of ctx.blocks) {
        for (let log of block.logs) {

            switch (log.topics[0]) {
                case usdtAbi.events.LotteryCreated.topic:
                    console.log('LotteryCreated Event');
                    await insertLottery(log, ctx);
                    break;

                case usdtAbi.events.LotteryLaunched.topic:
                    console.log('LotteryLaunched Event');
                    await startLottery(log, ctx);
                    break;

                case usdtAbi.events.TicketPurchased.topic:
                    console.log('TicketPurchased Event');
                    await insertTicket(log, ctx);
                    break;

                default:
                    console.log('Pas de traitement de ce log...');
            }
        }
    }
});


// insert info
async function insertLottery(log: Log, ctx: DataHandlerContext<Store, {}>) {
    let {ticketPrice, owner, description, lotteryId, minLaunchDate} = usdtAbi.events.LotteryCreated.decode(log);

    const convertedDate = new Date(Number(minLaunchDate) * 1000);
    const convertedPriceToEth = parseFloat(String(Number(ticketPrice) / 1e18));


    // save in end
    const lottery = new Lottery(lotteryId.toString(), owner, description, convertedPriceToEth, convertedDate);
    await ctx.store.insert(lottery);
}

async function startLottery(log: Log, ctx: DataHandlerContext<Store, {}>) {
    try {
        let {lotteryId, endDate, winner} = usdtAbi.events.LotteryLaunched.decode(log);
        const lottery = await ctx.store.findOneOrFail(Lottery, {
            where: {
                blockchainId: lotteryId?.toString(),
            }
        });

        lottery.winnerAddress = winner;
        await ctx.store.save(lottery);
    } catch (e) {
        console.error(e);
    }
}


async function insertTicket(log: Log, ctx: DataHandlerContext<Store, {}>) {
    try {
        let {lotteryId, buyer} = usdtAbi.events.TicketPurchased.decode(log);
        const lottery = await ctx.store.findOneOrFail(Lottery, {
            where: {
                blockchainId: lotteryId?.toString(),
            }
        });

        const ticketPurchased = new Ticket(lottery, buyer);
        await ctx.store.insert(ticketPurchased);
    } catch (e) {
        console.error(e);
    }
}