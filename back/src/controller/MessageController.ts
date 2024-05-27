import 'reflect-metadata';
import { JsonController, Param, Body, Get, Post, Put, Delete, Req, UseBefore, Patch, BadRequestError, NotFoundError } from 'routing-controllers';
import { AppDataSource } from '../db/data-source';
import { Message } from '../entity/Message';
import { Room } from '../entity/Room';

@JsonController()
export class MessageController {
    constructor(private messageRepository, private roomRepository) {
        this.messageRepository = AppDataSource.getRepository(Message);
        this.roomRepository = AppDataSource.getRepository(Room);

    }

    @Post("/message/create")
    public async create(@Body() data: Message) {
        try {
            const message: Message = data;
            if (!message) throw new BadRequestError('Message not created');

            const room: Room = await this.roomRepository.findOne({ where: { id: data.getRoom() } });
            if (!room) throw new NotFoundError('Room not found');

            message.setRoom(room)

            await this.messageRepository.save(message);

            return { success: "Message created" };
        } catch (error) {
            return { error: error.message };
        }
    }

    @Get('/message/room/:roomid')
    public async getAllMessageFromRoom(@Param('roomid') roomid: string) {
        try {
            const room: Room = await this.roomRepository.findOne({ where: { id: roomid } });
            if (!room) throw new NotFoundError('Room not found');

            const message: Message = await this.messageRepository.find({ where: { room: { id: roomid } }, order: { updated_at: "ASC" } });
            if (!message) throw new Error('Messages not found');
            return message;
        } catch (err) {
            return { error: err.message }
        }
    }


    @Delete('/message/:id')
    public async remove(@Param('id') id: string) {
        try {
            const message: Message = await this.messageRepository.findOne({ where: { id } });
            if (!message) throw new Error('Call not found');

            await this.messageRepository.remove(message);

            return { success: "Message deleted" };
        } catch (err) {
            return { error: err.message }
        }
    }

}
