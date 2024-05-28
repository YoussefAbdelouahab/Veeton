import * as supertest from "supertest";
import { app } from "../index";
import datatest from "./Datatest";

describe("MessageController Tests", () => {
    test("Create a Message", (done) => {
        setTimeout(() => {
            supertest(app)
                .post("/api/message/create")
                .send(datatest.message.data)
                .expect(200)
                .expect("Content-Type", "application/json; charset=utf-8")
                .end(done);
        }, 1000);
    });
    test("Create a Message 2", (done) => {
        setTimeout(() => {
            supertest(app)
                .post("/api/message/create")
                .send(datatest.message2.data)
                .expect(200)
                .expect("Content-Type", "application/json; charset=utf-8")
                .end(done);
        }, 1000);
    });

    test("Get all messages of a room", async () => {
        const res: supertest.Response = await supertest(app)
            .get(`/api/message/room/${datatest.message.data.room}`)
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8");
    });

});
