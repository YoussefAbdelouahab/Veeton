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
            //get the body data
            const room: Room = data;
            //check if the data is retrieved
            if (!room) throw new BadRequestError('Room not created');

            //check if there is a password in the body
            if (room.getPassword()) {
                //Hash the password
                const hash = await bcrypt.hash(data.getPassword(), 10);
                //Set the new hash password to the room infos
                room.setPassword(hash)
            }
            //Generate random ID
            room.setId(GenerateRoomID(6))
            //Save the room
            await this.roomRepository.save(room);
            //Return success + roomId
            return { success: "Room created", id: room.getId() };
        } catch (error) {
            //if any error return the error
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
            //Get the id of the room in the body and check if a room already exist with this id
            const room: Room = await this.roomRepository.findOne({ where: { id: data.getId() } });
            //If there is no room with the body's id send error
            if (!room) throw new Error('Room not found');

            //Check if the room has a password
            if (room.getPassword()) {
                //check if there is a password in the body, if not send error
                if (data.getPassword() == undefined) {
                    throw new Error('Password is required')
                }
                //compare the password
                const isValid = await bcrypt.compare(data.getPassword(), room.getPassword());
                //if the password is wrong, send error
                if (!isValid) throw new Error('Password Error');
            }

            //Create a token with the id & the name of the room joined
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
            //return succes, the room id & the token
            return res.status(200).json({ success: 'Room joined', id: room.getId(), token: token });
        } catch (error) {
            //if any error return the error
            return res.status(400).json({ error: error.message });
        }
    }

    @Get('/rooms')
    public async getAllRooms() {
        try {
            //find all rooms in the room database
            const room: Room = await this.roomRepository.find();
            if (!room) throw new NotFoundError('Room not found');
            // return the array of rooms
            return room;
        } catch (err) {
            //if any error return the error
            return { error: err.message }
        }
    }

}
