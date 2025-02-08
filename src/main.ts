import {DataHandlerContext, EvmBatchProcessor} from "@subsquid/evm-processor";
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
        topic0: [usdtAbi.events.LotteryCreated.topic, usdtAbi.events.TicketPurchased.topic],
    }).setBlockRange({
        from:7660000,
    })

export const db = new TypeormDatabase();

processor.run(db, async ctx => {
    for (let block of ctx.blocks) {
        for (let log of block.logs) {

            switch (log.topics[0]) {
                case usdtAbi.events.LotteryCreated.topic:
                    console.log('LotteryCreated Event');
                    let {minLaunchDate, ticketPrice, owner} = usdtAbi.events.LotteryCreated.decode(log);
                    console.log(minLaunchDate);
                    console.log(ticketPrice);
                    console.log(owner);

                    // await insertLottery('', ticketPrice, minLaunchDate, ctx);
                    break;

                case  usdtAbi.events.TicketPurchased.topic:
                    console.log('TicketPurchased Event');
                    let {lotteryId, buyer} = usdtAbi.events.TicketPurchased.decode(log);
                    console.log(lotteryId);
                    console.log(buyer);

                   // await insertTicketPurchased(lotteryId, buyer, BigInt(0), ctx);
                    break;

                default:
                    console.log('Pas de traitement de ce log...');
            }
        }
    }
});

// insert info
async function insertLottery(description: string, ticketPrice: bigint, minLaunchDate: bigint, ctx: DataHandlerContext<Store, {}>) {
    const convertedTicketPrice = Number(ticketPrice); // todo convert
    const lottery = new Lottery(description, convertedTicketPrice, convertTimestampToDate(minLaunchDate));
    // await ctx.store.insert(lottery);
}

async function insertTicketPurchased(lotteryId: bigint, buyer: string, purchasedAt: bigint, ctx: DataHandlerContext<Store, {}>) {

    const lottery = await ctx.store.findOneOrFail(Lottery, {
        where: {
            id: lotteryId.toString(),
        }
    });

    const ticketPurchased = new Ticket(lottery, buyer, convertTimestampToDate(purchasedAt));
    // await ctx.store.insert(ticketPurchased);
}


// function utils
function convertTimestampToDate(timestamp: bigint) {
    return new Date(Number(timestamp) * 1000);
}