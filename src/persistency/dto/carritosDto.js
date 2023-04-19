export default class carritosDTO {
    constructor( { _id, timestamp, productos } ) {
        this.id = _id,
        this.timestamp = timestamp,
        this.productos = productos
    }
}

export function transformarADTO(cart) {
    if (Array.isArray(cart)) {
        return cart.map(p => new carritosDTO(p))
    } else {
        return new carritosDTO(cart)
    }
}