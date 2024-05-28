import { Server } from "socket.io";

//create the new socket Server
const io = new Server({
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

//listen to event connection
io.on("connection", (socket) => {
    //listen to event chat message
    socket.on('chat message', (msg, user, room, date) => {
        //send back the same event with the same message
        io.emit('chat message', msg, user, room, date)
    })
});

io.listen(4000);