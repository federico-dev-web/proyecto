export default class productosDTO {
    constructor( { codigo, descripcion, foto, idStore, nombre, precio, stock, timestamp } ) {
        this.codigo = codigo,
        this.descripcion = descripcion,
        this.foto = foto,
        this.idStore = idStore,
        this.nombre = nombre,
        this.precio = precio,
        this.stock = stock,
        this.timestamp = timestamp
    }
}

export function transformarADTO(prod) {
    if (Array.isArray(prod)) {
        return prod.map(p => new productosDTO(p))
    } else {
        return new productosDTO(prod)
    }
}