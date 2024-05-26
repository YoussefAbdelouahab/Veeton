import { handleHide, handleShow } from "./Visibility";

export default function DisplayJoin() {
    handleHide("wrapper")
    handleHide("create")
    setTimeout(() => {
        handleShow("join")
    }, 1000);
}