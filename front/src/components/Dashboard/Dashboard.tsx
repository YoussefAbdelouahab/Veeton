import { useState } from "react";
import "./Dashboard.scss"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard(props: any) {
    //variables
    const [inputData, setInputData] = useState("")
    const [roomPassword, setRoomPassword] = useState("");
    const [submitError, setSubmitError] = useState("");
    const navigate = useNavigate();

    async function handleKeyDown(event: { key: string; }) {
        //check if the key pressed is enter
        if (event.key === 'Enter') {
            //request to join the new room
            axios.post(`http://localhost:8000/api/room/join`, {
                id: inputData,
                ...(roomPassword.length > 0 ? { password: roomPassword.trim() } : {})
            }).then(function (res) {
                //check if status code is 200
                if (res.status === 200) {
                    //set new token
                    localStorage.setItem("token", res.data.token)
                    //navigate to the new room page
                    navigate(`/room/${res.data.id}`)
                    //refresh the page
                    window.location.reload();
                    // refresh the inputs & errors
                    setSubmitError("")
                    setInputData("")
                    setRoomPassword("")
                }
            }).catch(function (error) {
                //if any error , display it
                setSubmitError(error.response.data.error)
            });
        }
    }
    return (
        <>
            <div className="dashboard-container">
                <div className="logo">
                    <img src="/assets/logo.svg" alt="" />
                </div>
                <div className="room-info">
                    <h1>{props.id}</h1>
                    <p>{props.name}</p>
                </div>
                <div className="status-info">
                    <div className="input-join">
                        <img src="/assets/search-icon.png" alt="" />
                        <input type="text" placeholder="Room ID" onKeyDown={handleKeyDown} value={inputData} onChange={e => setInputData(e.target.value)} />
                    </div>
                    <div className="input-join">
                        <img src="/assets/pwd.png" alt="" />
                        <input type="text" placeholder="Password" onKeyDown={handleKeyDown} value={roomPassword} onChange={e => setRoomPassword(e.target.value)} />
                    </div>
                    {submitError.length > 1 ? <><p className="error">{submitError}</p></> : null}
                </div>
            </div>
        </>
    )
}