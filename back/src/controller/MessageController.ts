import 'reflect-metadata';
import { JsonController, Param, Body, Get, Post, Put, Delete, Req, UseBefore, Patch } from 'routing-controllers';
import { AppDataSource } from '../db/data-source';
import { Message } from '../entity/Message';

@JsonController()
export class MessageController {
    constructor(private messageRepository) {
        this.messageRepository = AppDataSource.getRepository(Message);
    }

}
