import { handleHide, handleShow } from "./Visibility";

export default function DisplayCreate() {
    handleHide("wrapper")
    handleHide("join")
    setTimeout(() => {
        handleShow("create")
    }, 1000);
}