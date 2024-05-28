import * as supertest from "supertest";
import { app } from "../index";
import server from "../index";
import datatest from "./Datatest";

describe("RoomController Tests", () => {
    test("Create without Password", (done) => {
        setTimeout(() => {
            supertest(app)
                .post("/api/room/create")
                .send(datatest.room.data)
                .expect(200)
                .expect("Content-Type", "application/json; charset=utf-8")
                .end(done);
        }, 1000);
    });

    test("Create with Password", async () => {
        const res: supertest.Response = await supertest(app)
            .post("/api/room/create")
            .send(datatest.room2.data)
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8");
    });

    test("Join without password", async () => {
        const res: supertest.Response = await supertest(app)
            .post("/api/room/join")
            .send({
                id: datatest.room.id
            })
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8");
    });

    test("Join with password", async () => {
        const res: supertest.Response = await supertest(app)
            .post("/api/room/join")
            .send({
                id: datatest.room2.id,
                password: datatest.room2.data.password
            })
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8");
    });
});
