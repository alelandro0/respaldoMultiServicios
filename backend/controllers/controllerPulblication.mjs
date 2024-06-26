import User from '../models/user.mjs';
import { uploadFileP } from './uploadPublication.mjs';


export const postPublication = async (req, res) => {
    const image = req.files.file; // Obtener el primer archivo
    const description = req.body.description; // Obtener la primera descripción
    const userId = req.user.id;
    try {
        const userToUpdate = await User.findById(userId);
       

        if (!userToUpdate) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        const { downloadURL } = await uploadFileP(image[0]);
       
        

        userToUpdate.publication.push({
            profesionalId: userId,
            image: downloadURL,
            description: description,
            estado: true
        });

        await userToUpdate.save();
       
        return res.status(201).json({ message: 'Publicación realizada exitosamente.', downloadURL });
    } catch (error) {
        console.error('Error en la publicación de las imágenes:', error);
        return res.status(500).json({ message: 'Ocurrió un error en la publicación de las imágenes.' });
    }
};

export const getPublication = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findOne({ _id: userId });
        // Verificar si el ID de usuario es válido
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }
        // Verificar si el usuario existe en la base de datos
        const info=[]
        const usuario= {
            user:user.name,
            imagen: user.imageProfile,
        }
        
        // Obtener todas las publicaciones del usuario
        const publications = user.publication
        .filter(pub => pub.estado === true) 
        .map(pub => ({
            id:pub._id,
            image: pub.image,
            description: pub.description,
            createdAt: pub.createdAt 
        }));

        
        return res.status(200).json({ publications });
    } catch (error) {
       
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getPublicationAll = async (req, res) => {
    try {
        const users = await User.find();
        console.log("BD todos los usuarios all", users);

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No se encontraron usuarios all" });
        }

        const publications = users.map(user => {
            const nombre = user.name;
            return user.publication.filter(pub => pub.estado === true)
                                     .map(pub => ({
                                         image: pub.image,
                                         description: pub.description,
                                         name : nombre
                                     }));
        });

        console.log("BD get publicacion all", publications);
        return res.status(200).json({ publications });
    } catch (error) {
        console.error("Error al obtener las publicaciones:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const deletePublication = async (req, res) => {
    try {
        const userId = req.params.userId;
        const publicationId = req.params.publicationId;

      
        
        const user = await User.findOne({ _id: userId, "publication._id": publicationId });
               
        if (!user) {
            return res.status(404).json({ message: 'Usuario o publicaion no encontrado .' });
        }

       // Obtener el ID de la publicación a eliminar
       const publicationIndex = user.publication.findIndex(pub => pub._id.toString() === publicationId);
     
        if (publicationIndex === -1) {
            return res.status(404).json({ message: 'Publicación no encontrada.' });
        }

        user.publication[publicationIndex].estado = false; // Cambiar el estado de la publicación a false

        await user.save();

        return res.status(200).json({ message: 'Publicación eliminada exitosamente.' });
    } catch (error) {
       
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getPublicationAll = async (req, res) => {
    try {
        const users = await User.find();
      

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No se encontraron usuarios all" });
        }

        const publications = users.map(user => {
            const nombre = user.name;
            const imagenUser= user.imageProfile
            return user.publication.filter(pub => pub.estado === true)
                                     .map(pub => ({
                                         id: pub._id,
                                         profesionalId:pub.profesionalId,
                                         image: pub.image,
                                         description: pub.description,
                                         name : nombre,
                                         createdAt:pub.createdAt,
                                         imageProfile:imagenUser,
                                         likes:pub.likes
                                     }));
        });

       console.log(publications);
        return res.status(200).json({ publications });
    } catch (error) {
        
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};