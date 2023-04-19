export default class usuariosDTO {
    constructor( { _id, username, password, nombre, direccion, edad, telefono, avatar } ) {
        this.id = _id,
        this.username = username,
        this.password = password,
        this.nombre = nombre,
        this.direccion = direccion,
        this.edad = edad,
        this.telefono = telefono,
        this.avatar = avatar
    }
}

export function transformarADTO(users) {
    if (Array.isArray(users)) {
        return users.map(p => new usuariosDTO(p))
    } else {
        return new usuariosDTO(users)
    }
}