import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {v4 as uuidv4} from 'uuid';

@Entity({name: 'lottery'})
export class Lottery {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    blockchainId: string;

    @Column()
    description: string;

    @Column("decimal")
    ticketPrice: number;

    @Column({type: 'varchar'})
    owner: string;

    @Column({nullable: true, type: 'varchar'})
    winnerAddress: string;

    @Column()
    endDate: Date;

    constructor(blockchainId: string, owner: string, description: string, ticketPrice: number, endDate: Date, winnerAddress: string = '') {
        this.id = uuidv4();
        this.blockchainId = blockchainId;
        this.owner = owner;
        this.description = description;
        this.ticketPrice = ticketPrice;
        this.endDate = endDate;
        this.winnerAddress = winnerAddress;
    }
}