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

    /**
   * @swagger
   * /message/create:
   *   post:
   *     tags:
   *       - Message
   *     summary: Create a new message
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Message'
   *     responses:
   *       200:
   *         description: An object indicating the success message if creation is successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: string
   *       default:
   *         description: An object containing the error message
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   */
    @Post("/message/create")
    /**
   * Create a message.
   *
   * @param data - The message data to create.
   * @returns An object indicating the success or error message.
   */

    public async create(@Body() data: Message) {
        try {
            //get the message data in the body
            const message: Message = data;
            //if no message data, send error
            if (!message) throw new BadRequestError('Message not created');

            //search for the room of the message
            const room: Room = await this.roomRepository.findOne({ where: { id: data.getRoom() } });
            //if no room find, send error
            if (!room) throw new NotFoundError('Room not found');

            //assign the room to the message
            message.setRoom(room)

            //save the message to database
            await this.messageRepository.save(message);

            //return success
            return { success: "Message created" };
        } catch (error) {
            //if any error return the error
            return { error: error.message };
        }
    }

    /**
   * @swagger
   * /message/room/{roomid}:
   *   get:
   *     tags:
   *       - Message
   *     summary: Get all messages of a room
   *     parameters:
   *       - in: path
   *         name: roomid
   *         schema:
   *           type: string
   *         required: true
   *         description: The ID of a room
   *     responses:
   *       200:
   *         description: An array of messages if found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Message'
   *       default:
   *         description: Unexpected error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   */
    @Get('/message/room/:roomid')
    public async getAllMessageFromRoom(@Param('roomid') roomid: string) {
        try {
            //find the room by it's room id in parameters
            const room: Room = await this.roomRepository.findOne({ where: { id: roomid } });
            //if no room find, send error
            if (!room) throw new NotFoundError('Room not found');

            //get all the message of the room, from the older to the newest
            const message: Message = await this.messageRepository.find({ where: { room: { id: roomid } }, order: { updated_at: "ASC" } });
            //if no message found, send error
            if (!message) throw new Error('Messages not found');

            //return the array of messages
            return message;
        } catch (err) {
            //if any error return the error
            return { error: err.message }
        }
    }

    /**
   * @swagger
   * /message/{id}:
   *   delete:
   *     tags:
   *       - Message
   *     summary: Remove a message
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of a message to be removed
   *     responses:
   *       200:
   *         description: Message deleted
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: string
   *       default:
   *         description: Unexpected error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   */
    @Delete('/message/:id')
    public async remove(@Param('id') id: string) {
        try {
            //find the message by it's message id in parameters
            const message: Message = await this.messageRepository.findOne({ where: { id } });
            //if message not found, send error
            if (!message) throw new Error('Message not found');

            //Remove the message from database
            await this.messageRepository.remove(message);

            //Return success
            return { success: "Message deleted" };
        } catch (err) {
            //if any error return the error
            return { error: err.message }
        }
    }

}
