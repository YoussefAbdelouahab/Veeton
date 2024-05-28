import 'reflect-metadata';
import { JsonController, Param, Body, Get, Post, Put, Delete, Req, Patch, BadRequestError, NotFoundError, Controller, Res } from 'routing-controllers';
import { AppDataSource } from '../db/data-source';
import { Room } from '../entity/Room';
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Response } from 'express';

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
@Controller()
export class RoomController {
    constructor(private roomRepository) {
        this.roomRepository = AppDataSource.getRepository(Room);
    }

    /**
   * @swagger
   * /room/create:
   *   post:
   *     tags:
   *       - Room
   *     summary: Create a new room
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Room'
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
    @Post("/room/create")
    /**
   * Create a new room.
   *
   * @param data - The room data entetred.
   * @returns An object indicating the success or error message.
   */
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

            return { success: "Room created", id: room.getId() };
        } catch (error) {
            return { error: error.message };
        }
    }

    /**
   * @swagger
   * /room/join:
   *   post:
   *     tags:
   *       - Room
   *     summary: Join a room
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Room'
   *     responses:
   *       200:
   *         description: An object indicating the success message if join is successful
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
    @Post("/room/join")
    /**
   * Join a room.
   *
   * @param data - The room data to join.
   * @returns An object indicating the success or error message.
   */
    public async join(@Body() data: Room, @Res() res: Response) {
        try {
            const room: Room = await this.roomRepository.findOne({ where: { id: data.getId() } });
            if (!room) throw new Error('Room not found');

            if (room.getPassword()) {
                if (data.getPassword() == undefined) {
                    throw new Error('Password is required')
                }

                const isValid = await bcrypt.compare(data.getPassword(), room.getPassword());
                if (!isValid) throw new Error('Password Error');
            }

            const token = jwt.sign(
                {
                    id: room.getId(),
                    name: room.getName()
                },
                "bc042227-9f88-414d",
                {
                    expiresIn: "24h",
                }
            );

            return res.status(200).json({ success: 'Room joined', id: room.getId(), token: token });
        } catch (error) {
            return res.status(400).json({ error: error.message });
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
