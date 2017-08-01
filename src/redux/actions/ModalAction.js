export function showModal(name) {
    return {
        type: "MODAL_SHOW",
        name: name
    }
}

export function hideModal() {
    return {
        type: "MODAL_HIDE"
    }
}