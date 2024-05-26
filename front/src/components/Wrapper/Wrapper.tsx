import DisplayCreate from "../../utils/DisplayCreate";
import DisplayJoin from "../../utils/DisplayJoin";

import './Wrapper.scss'

export default function Wrapper() {
    return (
        <div className="wrapper" id="wrapper">
            <h1>VEETON'S CHAT</h1>
            <h2>The brand new chat from Veeton</h2>
            <p>You can create a room, or join a friend's room.<br></br> Yes, it's as simple as it looks.</p>
            <div className="button-container">
                <button className="button create-button" onClick={() => DisplayCreate()}>
                    Create a room
                </button>
                <button className="button join-button" onClick={() => DisplayJoin()}>
                    Join a room
                </button>
            </div>
        </div>
    )
}