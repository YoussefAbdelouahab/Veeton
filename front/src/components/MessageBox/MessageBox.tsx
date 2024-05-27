import moment from "moment"
import axios from "axios";
import "./MessageBox.scss"
import { useState } from "react";

export default function MessageBox(props: any) {
    const [ask, setAsk] = useState(false);
    function handleDelete() {
        axios.delete(`http://localhost:8000/api/message/${props.id}`)
    }
    return (
        <>
            {ask ? <div className="delete-modal">
                <div className="modal-container">
                    <h1>Delete Message</h1>
                    <p>Do you really want to delete this message ?</p>
                    <div className="modal-message">
                        <div className="message-data">
                            <strong>{props.name}</strong>
                            <p>{moment(props.date).calendar()}</p>
                        </div>
                        <div className="message-content">
                            <p>{props.content}</p>
                        </div>
                    </div>
                </div>
                <div className="modal-btn">
                    <button className="cancel-btn" onClick={() => setAsk(false)}>Cancel</button>
                    <button className="delete-btn" onClick={() => handleDelete()}>Delete</button>
                </div>
            </div> : null}

            <div className={`${props.name === localStorage.getItem("user") ? "message-box self" : "message-box"}`}>
                <div className="username">
                    <p>{props.name}</p>
                </div>
                <div className="content">
                    <p>{props.content}</p>
                    <button className="delete-btn" onClick={() => setAsk(true)}><img src="/assets/delete.png" alt="" /></button>
                </div>
                <div className="date">
                    <p>{moment(props.date).calendar()}</p>
                </div>
            </div>
        </>
    )
}