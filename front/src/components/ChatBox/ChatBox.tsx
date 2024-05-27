import MessageBox from "../MessageBox/MessageBox"
import InputEmoji from "react-input-emoji";
import { useState } from "react"
import axios from "axios"
import "./ChatBox.scss"

function updateScroll() {
    var element = document.getElementById("messages-container");
    if (element) {
        window.scrollTo(0, document.body.scrollHeight);
    }
}

export default function ChatBox(props: any) {
    const [textMessage, setTextMessage] = useState("");

    function handleOnEnter() {
        axios.post(`http://localhost:8000/api/message/create`, {
            user: localStorage.getItem("user"),
            content: textMessage,
            room: props.id
        }).then(function (res) {
            if (res.status === 200) {
                props.socket.emit('chat message', textMessage, localStorage.getItem("user"), props.id, Date.now())
                updateScroll();
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