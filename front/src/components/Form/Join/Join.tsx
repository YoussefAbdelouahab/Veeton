import { useState } from "react";
import axios from "axios";
import DisplayCreate from "../../../utils/DisplayCreate";
import CheckEmptyString from "../../../utils/CheckEmptyString";
import './Join.scss'

export default function Join() {
    const [room, setRoom] = useState({
        id: "",
        password: "",
    })
    const [user, setUser] = useState("");
    const [showError, setShowError] = useState(false);
    const [showError2, setShowError2] = useState(false);
    const [submitError, setSubmitError] = useState("");

    function joinRoom() {
        if (user.length === 0) {
            setShowError(true);
        } else {
            setShowError(false);
        }

        if (room.id.length === 0) {
            setShowError2(true);
        } else {
            setShowError2(false);
        }

        if (CheckEmptyString(user) === 0 || CheckEmptyString(room.id) === 0) {
            return 0;
        }

        //save nickname for later
        localStorage.setItem("user", user);

        axios.post(`http://localhost:8000/api/room/join`, {
            id: room.id.trim(),
            ...(room.password.length > 0 ? { password: room.password.trim() } : {})
        }).then(function (res) {
            if (res.status === 200) {
                //To do
            }
        }).catch(function (error) {
            setSubmitError(error.response.data.error)
        });
    }

    return (
        <>
            <div className='join hidden' id='join'>
                <div className='form-title'>
                    <h2><strong>Join a friend</strong></h2>
                    <p>Wanna create a room ? <span onClick={() => DisplayCreate()}>Create</span></p>
                </div>
                <div className='input-box'>
                    <p>Nickname *</p>
                    <input type="text" placeholder='Flore' onChange={e => setUser(e.target.value)} />
                    {showError ? <><p className="error">Nickname requested to join a room</p></> : null}
                </div>
                <div className='input-box'>
                    <p>ID of the room *</p>
                    <input type="text" placeholder='Random' onChange={e => setRoom({ ...room, id: e.target.value })} />
                    {showError2 ? <><p className="error">Room ID requested to join a room</p></> : null}
                </div>
                <div className='input-box'>
                    <p>Password</p>
                    <input type="text" placeholder='None' onChange={e => setRoom({ ...room, password: e.target.value })} />
                </div>
                <button onClick={() => joinRoom()}>Create</button>
                {submitError.length > 1 ? <><p className="error">{submitError}</p></> : null}

            </div >
        </>
    )
}