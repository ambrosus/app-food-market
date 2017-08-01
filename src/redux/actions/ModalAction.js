export function showModal(name, args = {}) {
    return {
        type: "MODAL_SHOW",
        name: name,
        args: args
    }
}

export function hideModal() {
    return {
        type: "MODAL_HIDE"
    }
}