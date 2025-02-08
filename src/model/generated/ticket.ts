import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import {Lottery} from "./lottery";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Lottery)
    lottery: Lottery;

    @Column()
    buyer: string;

    @Column()
    purchaseDate: Date;

    constructor(lottery: Lottery, buyer: string, purchaseDate: Date = new Date()) {
        this.id = uuidv4();
        this.lottery = lottery;
        this.buyer = buyer;
        this.purchaseDate = purchaseDate;
    }
}