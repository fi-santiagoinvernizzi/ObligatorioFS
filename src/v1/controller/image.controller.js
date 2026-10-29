
import { subirImagen } from "../services/images.services.js";

export const subirImagenController = async (req, res, next) => {
    try {
        const { file } = req.body ?? {};

        if (!file) {
            return res.status(400).json({
                error: "No se recibió la imagen en el campo 'file'.",
            });
        }

        const resultado = await subirImagen(file);

        return res.status(200).json({
            secure_url: resultado.secure_url,
            public_id: resultado.public_id,
        });
    } catch (error) {
        console.error("Error al subir la imagen a Cloudinary:", error.message);
        next(error);
    }
};
