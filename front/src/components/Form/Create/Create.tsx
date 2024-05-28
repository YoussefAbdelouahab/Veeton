import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DisplayJoin from "../../../utils/DisplayJoin";
import axios from "axios";
import './Create.scss'

export default function Create() {
    //variables
    const [room, setRoom] = useState({
        name: "",
        password: "",
    })
    const [user, setUser] = useState("");
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    function createRoom() {
        //check if there is a user name
        if (user.length === 0) {
            setShowError(true);
            return 0;
        }
        //save nickname for later
        localStorage.setItem("user", user);
        setShowError(false);

        //Create the room
        axios.post(`http://localhost:8000/api/room/create`, {
            ...(room.name.length > 0 ? { name: room.name.trim() } : {}),
            ...(room.password.length > 0 ? { password: room.password.trim() } : {})

        }).then(function (res) {
            //then join it
            axios.post(`http://localhost:8000/api/room/join`, {
                id: res.data.id,
                ...(room.password.length > 0 ? { password: room.password.trim() } : {})

            }).then(function (res) {
                //if status code is 200
                if (res.status === 200) {
                    //save the token
                    localStorage.setItem("token", res.data.token)
                    //redirect to room page with id
                    navigate(`/room/${res.data.id}`)
                }
            }).catch(function (error) {
                console.log(error);
            });
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