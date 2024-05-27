import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    socket.on('chat message', (msg, user, room, date) => {
        io.emit('chat message', msg, user, room, date)
    })
});

io.listen(4000);