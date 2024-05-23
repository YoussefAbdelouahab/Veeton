import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    Index,
    ManyToOne,
    JoinColumn,
    CreateDateColumn, UpdateDateColumn,
    OneToMany
} from "typeorm"
import { Message } from "./Message";

@Entity()
export class Room {

    @PrimaryGeneratedColumn("uuid")
    private id: string

    @Column({ nullable: true })
    private name: string

    @Column({ nullable: true })
    private password: string

    @OneToMany(() => Message, (message) => message.room, { cascade: true, onDelete: "CASCADE" })
    message: Message[];

    constructor(name: string, password: string) {
        this.name = name;
        this.password = password;
    }

    public getId(): string {
        return this.id;
    }
    public getName(): string {
        return this.name;
    }
    public setName(name: string): void {
        this.name = name;
    }
    public getPassword(): string {
        return this.password;
    }
    public setPassword(password: string): void {
        this.password = password;
    }

}
