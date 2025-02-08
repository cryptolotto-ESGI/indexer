import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({name: 'lottery'})
export class Lottery {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @Column()
    ticketPrice: number;

    @Column({ nullable: true, type: 'varchar' })
    winnerAddress: string;

    @Column()
    endDate: Date;

    constructor(description: string, ticketPrice: number, endDate: Date, winnerAddress: string = '') {
        this.id = uuidv4();
        this.description = description;
        this.ticketPrice = ticketPrice;
        this.endDate = endDate;
        this.winnerAddress = winnerAddress;
    }
}