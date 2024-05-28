import { handleHide, handleShow } from "./Visibility";

//add the show class to create, and add the hidden class to wrapper & join
export default function DisplayCreate() {
    handleHide("wrapper")
    handleHide("join")
    setTimeout(() => {
        handleShow("create")
    }, 1000);
}