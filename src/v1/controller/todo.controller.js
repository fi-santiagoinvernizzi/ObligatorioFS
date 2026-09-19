import { createTareaService, deleteTareaService, getAllTareasService, getTareasByUserService, replaceTareaService, updateTareaService } from "../services/tarea.services.js";
// import * as serviceTareas from "../services/tarea.services.js";
//serviceTareas.getAllTareasService()


export const getTareasController = async (req, res) => {
    try {
        const tareas = await getAllTareasService();
        return res.status(200).json(tareas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getTareaByIdController = async (req, res, next) => {
    try {
        const { idTarea } = req.params;
        const tarea = await getTareaByIdService(idTarea);
        if (!tarea) {
            return res.status(404).json({ message: "Tarea no encontrada" });
            // const error = constructorError(404, "Tarea no encontrada");
            // return next(error)
        }
        return res.status(200).json(tarea);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



export const getTareasByUserController = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            //TODO verificar si esta bien esto 
            return res.status(404).json({ message: "No se pudo encontrar el usuario" });
        }
        const tareas = await getTareasByUserService(userId);
        return res.status(200).json(tareas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const createTareaController = async (req, res) => {
    try {

        const userId = req.user?.id;
        if (!userId) {
            //TODO verificar si esta bien esto 
            return res.status(404).json({ message: "No se pudo encontrar el usuario" });
        }
        const data = req.body;
        const tarea = await createTareaService(userId, data);
        return res.status(201).json({ tarea });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



export const deleteTareaController = async (req, res) => {
    const { idTarea } = req.params;
    const userId = req.user?.id;
    if (!userId) {
        //TODO verificar si esta bien esto 
        return res.status(404).json({ message: "No se pudo encontrar el usuario" });
    }


    await deleteTareaService(userId, idTarea);
    return res.status(204).send();
    //res.status(204).end();
    //res.sendStatus(204);

}


export const updateTareaController = async (req, res) => {
    try {
        const { idTarea } = req.params;
        const data = req.body;

        const tarea = await updateTareaService(idTarea, data);
        if (!tarea) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }
        return res.status(200).json(tarea);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const replaceTareaController = async (req, res) => {
    try {
        const { idTarea } = req.params;
        const data = req.body;
        const tarea = await replaceTareaService(idTarea, data);
        if (!tarea) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }
        return res.status(200).json(tarea);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}






