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


export const eliminarImagen = async (publicId) => {
  if (!publicId) {
    throw new Error("Falta el identificador de la imagen.");
  }

  const resultado = await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
    invalidate: true,
  });

  if (resultado.result !== "ok" && resultado.result !== "not found") {
    throw new Error("No se pudo eliminar la imagen de Cloudinary.");
  }

  return resultado;
};

