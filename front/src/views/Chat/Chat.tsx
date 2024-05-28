import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import Dashboard from "../../components/Dashboard/Dashboard";
import axios from "axios";
import ChatBox from "../../components/ChatBox/ChatBox";
import { io } from "socket.io-client";
import "./Chat.scss"

//interface to decode the token
interface MyToken {
    id: string;
    name: string;
}

export default function Chat() {
    //variables
    const [roomName, setRoomName] = useState("");
    const url = window.location.href;
    const roomId = url.split("/").pop();
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const [socket, setSocket] = useState<any>(null)
    const navigate = useNavigate();
    const [message, setMessage] = useState([{}]);

    //initializing the socket
    useEffect(() => {
        const newSocket = io("http://localhost:4000")
        setSocket(newSocket)
        //listen for a 'chat message' event
        newSocket.on('chat message', (msg: any, user: any, room: any, date: any) => {
            //check the room of the message is right
            if (room === roomId) {
                //create the new message
                let newMessage = {
                    user: user,
                    content: msg,
                    created_at: date
                }
                //add the message to the array of message
                setMessage(message => [...message, newMessage])
            }


        })
        return () => {
            //disconnect from socket
            newSocket.disconnect()
        }
    }, [roomId])

    //check token & get all messages of the room
    useEffect(() => {
        //check token
        function CheckToken() {
            //check if there is a token
            if (token != null) {
                //decode the token
                const decodedToken = jwtDecode<MyToken>(token);
                //get the room name in the token
                setRoomName(decodedToken["name"])
                //check if the room id in the token match the id of the current room
                if (decodedToken["id"] !== roomId) {
                    //redirect home
                    navigate("/")
                }
            } else {
                //redirect home
                navigate("/")
            }

            if (user == null || user === "") {
                //redirect home
                navigate("/")
            }
        }
        CheckToken();

        //get all messages of the room
        function getMessage() {
            //send a request to the api
            axios.get(`http://localhost:8000/api/message/room/${roomId}`)
                .then(function (res) {
                    //check if status is 200
                    if (res.status === 200) {
                        //delete the first iteration of the array because it's empty
                        message.shift()
                        //set the array of messages
                        setMessage(res.data)
                    }
                }).catch(function (error) {
                    //if any error print it in console
                    console.log(error)
                    //redirect home
                    navigate("/")
                })
        }
        getMessage();
    }, [message, navigate, roomId, token, user])


    return (
        <>
            <div className="chat-container">
                <Dashboard id={roomId} name={roomName} />
                <div className="chat-wrapper">
                    <ChatBox message={message} id={roomId} socket={socket} />
                </div>
            </div>
        </>
    );
}