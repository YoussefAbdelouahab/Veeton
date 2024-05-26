export function handleShow(className: string) {
    let element = document.getElementById(className);
    if (element) {
        element.classList.add("show")
        element.classList.remove("hidden")
    }
}

export function handleHide(className: string) {
    let element = document.getElementById(className);
    if (element) {
        element.classList.add("hidden")
    }
}