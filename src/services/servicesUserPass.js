import userPassRepo from "../persistency/repository/userPassRepo.js"

const userPass = new userPassRepo() 

//Devuelve todos los usuarios
export const listarTodosLosUsuarios = async () => {
    let info = await userPass.listarTodosLosUsuarios()
    return info
}

//Devuelve un usuario
export const getUsuario = async ( usuario ) => {
    let info = await userPass.getUsuario( usuario )
    return info[0]
}

//Inserta un usuario
export const insertarUsuario = async ( newUser ) => {
    let info = await userPass.insertarUsuario( newUser )
    return info
}