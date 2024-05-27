import moment from "moment"
import "./MessageBox.scss"

export default function MessageBox(props: any) {
    return (
        <>
            <div className={`${props.name === localStorage.getItem("user") ? "message-box self" : "message-box"}`}>
                <div className="username">
                    <p>{props.name}</p>
                </div>
                <div className="content">
                    <p>{props.content}</p>
                </div>
                <div className="date">
                    <p>{moment(props.date).calendar()}</p>
                </div>
            </div>
        </>
    )
}