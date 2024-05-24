import 'reflect-metadata';
import { JsonController, Param, Body, Get, Post, Put, Delete, Req, Patch, BadRequestError, NotFoundError } from 'routing-controllers';
import { AppDataSource } from '../db/data-source';
import { Room } from '../entity/Room';
import * as bcrypt from "bcrypt";

function GenerateRoomID(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
@JsonController()
export class RoomController {
    constructor(private roomRepository) {
        this.roomRepository = AppDataSource.getRepository(Room);
    }

    @Post("/room/create")
    public async create(@Body() data: Room) {
        try {
            const room: Room = data;
            if (!room) throw new BadRequestError('Room not created');

            if (room.getPassword()) {
                const hash = await bcrypt.hash(data.getPassword(), 10);
                room.setPassword(hash)
            }
            room.setId(GenerateRoomID(6))

            await this.roomRepository.save(room);

            return { success: "Room created" };
        } catch (error) {
            return { error: error.message };
        }
    }

    @Post("/room/join")
    public async join(@Body() data: Room) {
        try {
            const room: Room = await this.roomRepository.findOne({ where: { id: data.getId() } });
            if (!room) throw new NotFoundError('Room not found');

            if (room.getPassword) {
                if (data.getPassword() == undefined) {
                    throw new BadRequestError('Password is required')
                }

                const isValid = await bcrypt.compare(data.getPassword(), room.getPassword());
                if (!isValid) throw new BadRequestError('Password Error');
            }

            return { success: "Room joined" };
        } catch (error) {
            return { error: error.message };
        }
    }

    @Get('/rooms')
    public async getAllRooms() {
        try {
            const room: Room = await this.roomRepository.find();
            if (!room) throw new NotFoundError('Room not found');
            return room;
        } catch (err) {
            return { error: err.message }
        }
    }

}
