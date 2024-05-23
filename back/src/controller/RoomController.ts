import 'reflect-metadata';
import { JsonController, Param, Body, Get, Post, Put, Delete, Req, Patch } from 'routing-controllers';
import { AppDataSource } from '../db/data-source';
import { Room } from '../entity/Room';

@JsonController()
export class RoomController {
    constructor(private roomRepository) {
        this.roomRepository = AppDataSource.getRepository(Room);
    }

}
