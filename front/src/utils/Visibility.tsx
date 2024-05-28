//add show class to an element
export function handleShow(className: string) {
    let element = document.getElementById(className);
    if (element) {
        element.classList.add("show")
        element.classList.remove("hidden")
    }
}

//add hidden class to an element
export function handleHide(className: string) {
    let element = document.getElementById(className);
    if (element) {
        element.classList.add("hidden")
    }
}