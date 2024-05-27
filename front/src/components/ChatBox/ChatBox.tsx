import MessageBox from "../MessageBox/MessageBox"
import InputEmoji from "react-input-emoji";
import { useState } from "react"
import axios from "axios"
import "./ChatBox.scss"
export default function ChatBox(props: any) {
    const [textMessage, setTextMessage] = useState("")

    function handleOnEnter() {
        axios.post(`http://localhost:8000/api/message/create`, {
            user: localStorage.getItem("user"),
            content: textMessage,
            room: props.id
        }).then(function (res) {
            if (res.status === 200) {
                props.socket.emit('chat message', textMessage, localStorage.getItem("user"), props.id, Date.now())
            }
        }).catch(function (error) {
            console.log(error)
        });
    }
    return (
        <>
            <div className="chatbox">
                <div className="messages-container">
                    {props.message.map((message: any) => (

                        <MessageBox name={message.user} content={message.content} date={message.created_at} />
                    ))}
                </div>
                <div className="input-container">
                    <InputEmoji
                        value={textMessage}
                        onChange={setTextMessage}
                        cleanOnEnter
                        onEnter={handleOnEnter}
                        placeholder="Type a message ..."
                        shouldConvertEmojiToImage={false}
                        shouldReturn={true}
                    />
                </div>
            </div>

        </>
    )
}