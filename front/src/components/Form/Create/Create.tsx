import { useState } from "react";
import DisplayJoin from "../../../utils/DisplayJoin";
import './Create.scss'
import axios from "axios";

export default function Create() {
    const [room, setRoom] = useState({
        name: "",
        password: "",
    })
    const [user, setUser] = useState("");
    const [showError, setShowError] = useState(false);

    function createRoom() {
        if (user.length === 0) {
            setShowError(true);
            return 0;
        }
        //save nickname for later
        localStorage.setItem("user", user);
        setShowError(false);

        axios.post(`http://localhost:8000/api/room/create`, {
            ...(room.name.length > 0 ? { password: room.name.trim() } : {}),
            ...(room.password.length > 0 ? { password: room.password.trim() } : {})
        }).then(function (res) {
            //to do
        }).catch(function (error) {
            console.log(error);
        });
    }
    return (
        <>
            <div className='create hidden' id='create'>
                <div className='form-title'>
                    <h2><strong>Chat room</strong></h2>
                    <p>Wanna join a room ? <span onClick={() => DisplayJoin()}>Join</span></p>
                </div>
                <div className='input-box'>
                    <p>Nickname *</p>
                    <input type="text" placeholder='Flore' onChange={e => setUser(e.target.value)} />
                    {showError ? <><p className="error">Nickname requested to create a room</p></> : null}
                </div>
                <div className='input-box'>
                    <p>Name of the room</p>
                    <input type="text" placeholder='Random' onChange={e => setRoom({ ...room, name: e.target.value })} />
                </div>
                <div className='input-box'>
                    <p>Password</p>
                    <input type="text" placeholder='None' onChange={e => setRoom({ ...room, password: e.target.value })} />
                </div>
                <button onClick={() => createRoom()}>Create</button>
            </div>
        </>
    )
}