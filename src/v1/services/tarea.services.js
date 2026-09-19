import Tarea from "../models/tareas.model.js";
import { generarKeyRedisTareasUser } from "../utils/generar-key-redis.js";
import { eliminarDato, guardarDato, obtenerDato } from "./redis.service.js";



export const getAllTareasService = async () => {
    return await Tarea.find().populate("userId", "name email");
};

// getbyid
export const getTareaByIdService = async (id) => {
    return await Tarea.findById(id).populate("userId", "name email");
};

// getbyuserid
export const getTareasByUserService = async (userId) => {

    const keyRedis = generarKeyRedisTareasUser(userId);
    //primero pregunta en redis si tiene el dato

    const tareasUsuario = await obtenerDato(keyRedis);
    let tareasSalida;
    //si lo tiene lo devuelve
    if (tareasUsuario) {
        tareasSalida = tareasUsuario;
        console.log("Encontro en redis la lista de tareas")
    } else {//si no lo tiene lo busca en mongo y lo guarda en redis
        tareasSalida = await Tarea.find({ userId }).populate("userId", "name email");
        guardarDato(keyRedis, tareasSalida);
        console.log('Busco la lista desde mongo');
    }
    return tareasSalida;
};

// getbycompleted
export const getTareasByCompletedService = async (completed) => {
    return await Tarea.find({ completed }).populate("userId", "name email");
};

// getbytitle
export const getTareasByTitleService = async (title) => {
    return await Tarea.find({ title: { $regex: title, $options: "i" } }).populate("userId", "name email");
};


// crear
export const createTareaService = async (userId, data) => {
    const keyRedis = generarKeyRedisTareasUser(userId);
    data.userId = userId;
    const tarea = await Tarea.create(data);
    eliminarDato(keyRedis);
    return tarea;
}

//delete
export const deleteTareaService = async (userId, idTarea) => {

    const keyRedis = generarKeyRedisTareasUser(userId);

    const tarea = await getTareaByIdService(idTarea);
    if (!tarea) {
        const error = new Error("Tarea no encontrada");
        error.status = 404;
        throw error;
    }
    //porque el objeto esta populado 
    const idPropietario = tarea.userId?._id ?? tarea.userId;
    if (idPropietario.toString() !== userId.toString()) {
        const error = new Error(
            "No puede borrar la tarea porque no le pertenece"
        );
        error.status = 403;
        throw error;
    }
    //se elimina de redis la lista de tareas del usuario
    //ya que al eliminar una tarea la lista no representa lo que hay en mongo
    //esto fuerza a que al consultar las tareas del usuario, no se obtenga el dato
    //desde redis y tenga que volver a consultarse a mongo, obteniendo ahora si la
    //lista de tareas sin la que se acaba de eliminar
    eliminarDato(keyRedis);
    return Tarea.findByIdAndDelete(idTarea);
};

//update
export const updateTareaService = async (id, data) => {
    return await Tarea.findByIdAndUpdate(id, data, { returnDocument: true });
}

// replace
export const replaceTareaService = async (id, data) => {
    //new es deprecado se cambia por returnDocument
    return await Tarea.findOneAndReplace({ _id: id }, data, { returnDocument: true });
}