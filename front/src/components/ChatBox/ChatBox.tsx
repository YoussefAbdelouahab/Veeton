import MessageBox from "../MessageBox/MessageBox"
import InputEmoji from "react-input-emoji";
import { useState } from "react"
import axios from "axios"
import "./ChatBox.scss"

export default function ChatBox(props: any) {
    //variable for the message input
    const [textMessage, setTextMessage] = useState("");

    function handleOnEnter() {
        //request to create a new message
        axios.post(`http://localhost:8000/api/message/create`, {
            user: localStorage.getItem("user"),
            content: textMessage,
            room: props.id
        }).then(function (res) {
            //check if status code is 200
            if (res.status === 200) {
                //send the new message to socket server
                props.socket.emit('chat message', textMessage, localStorage.getItem("user"), props.id, Date.now())
            }
        }).catch(function (error) {
            console.log(error)
        });
    }
    return (
        <>
            <div className="chatbox" >
                <div className="messages-container" id="messages-container">
                    {props.message.length > 0 ? props.message.map((message: any) => (
                        <MessageBox name={message.user} content={message.content} date={message.created_at} id={message.id} />
                    )) : null}
                </div>
                <div className="input-container">
                    <InputEmoji
                        value={textMessage}
                        onChange={setTextMessage}
                        cleanOnEnter
                        onEnter={handleOnEnter}
                        placeholder="Type a message ..."
                        shouldConvertEmojiToImage={false}
                        shouldReturn={false}
                    />
                </div>
            </div>

        </>
    )
}