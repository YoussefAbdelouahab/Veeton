import moment from "moment"
import axios from "axios";
import "./MessageBox.scss"
import { useState } from "react";

export default function MessageBox(props: any) {
    //variables
    const [ask, setAsk] = useState(false);
    //onclick delete
    function handleDelete() {
        //request to delete the message
        axios.delete(`http://localhost:8000/api/message/${props.id}`)
            .then(function (res) {
                if (res.status === 200) {
                    //if the message delete, hide the modal
                    setAsk(false);
                }
            }).catch(function (error) {
                console.log(error)
            });
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
                    {props.name === localStorage.getItem("user") ? <button className="delete-btn" onClick={() => setAsk(true)}><img src="/assets/delete.png" alt="" /></button> : null}
                </div>
                <div className="date">
                    <p>{moment(props.date).calendar()}</p>
                </div>
            </div>
        </>
    )
}