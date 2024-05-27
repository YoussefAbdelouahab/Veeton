import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import Dashboard from "../../components/Dashboard/Dashboard";
import axios from "axios";
import ChatBox from "../../components/ChatBox/ChatBox";
import { io } from "socket.io-client";

import "./Chat.scss"

interface MyToken {
    id: string;
    name: string;
}

export default function Chat() {
    //room variables
    const [roomName, setRoomName] = useState("");
    const url = window.location.href;
    const roomId = url.split("/").pop();
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const [socket, setSocket] = useState<any>(null)
    const navigate = useNavigate();

    //message variables
    const [message, setMessage] = useState([{}]);

    //initializing the socket
    useEffect(() => {
        const newSocket = io("http://localhost:4000")
        setSocket(newSocket)

        newSocket.on('chat message', (msg: any, user: any, room: any, date: any) => {
            let newMessage = {
                user: user,
                content: msg,
                created_at: date
            }

            setMessage(message => [...message, newMessage])

        })
        return () => {
            newSocket.disconnect()
        }
    }, [])

    useEffect(() => {
        function CheckToken() {
            if (token != null) {
                const decodedToken = jwtDecode<MyToken>(token);
                setRoomName(decodedToken["name"])
                if (decodedToken["id"] !== roomId) {
                    navigate("/")
                }
            } else {
                navigate("/")
            }

            if (user == null || user === "") {
                navigate("/")
            }
        }
        CheckToken();

        function getMessage() {
            axios.get(`http://localhost:8000/api/message/room/${roomId}`)
                .then(function (res) {
                    if (res.status === 200) {
                        setMessage(res.data)
                    }
                }).catch(function (error) {
                    console.log(error)
                })
        }
        getMessage();
    }, [navigate, roomId, token, user])
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