import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    Index,
    ManyToOne,
    JoinColumn,
    CreateDateColumn, UpdateDateColumn
} from "typeorm"
import { Room } from "./Room"

@Entity()
export class Message {

    @PrimaryGeneratedColumn("uuid")
    private id: string

    @Column()
    private user: string

    @Column()
    private content: string

    @ManyToOne(type => Room, { onDelete: 'CASCADE' }) // Init many to one relation with User
    @JoinColumn()
    room: Room;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    private created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    private updated_at: Date;

    constructor(user: string, content: string) {
        this.user = user;
        this.content = content;
    }

    public getId(): string {
        return this.id;
    }
    public getUser(): string {
        return this.user;
    }
    public setUser(user: string): void {
        this.user = user;
    }
    public getContent(): string {
        return this.content;
    }
    public setContent(content: string): void {
        this.content = content;
    }

    public getCreated_at(): Date {
        return this.created_at;
    }
    public getUpdated_at(): Date {
        return this.updated_at;
    }
}
