import { handleHide, handleShow } from "./Visibility";

//add the show class to join, and add the hidden class to wrapper & create
export default function DisplayJoin() {
    handleHide("wrapper")
    handleHide("create")
    setTimeout(() => {
        handleShow("join")
    }, 1000);
}