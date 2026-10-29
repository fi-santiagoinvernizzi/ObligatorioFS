
import cloudinary from "../config/cloudinary.config.js";

export const subirImagen = async (imagenBase64) => {
  const resultado = await cloudinary.uploader.upload(imagenBase64, {
    folder: process.env.CLOUD_FOLDER || "peliculas",
    resource_type: "image",
  });

  return {
    secure_url: resultado.secure_url,
    public_id: resultado.public_id,
  };
};
