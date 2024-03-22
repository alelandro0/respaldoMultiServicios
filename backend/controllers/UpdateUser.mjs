import User from '../models/user.mjs';
import bcrypt from 'bcrypt';

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
    console.log(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

const isValidEmail = (email) => {
  // Utiliza una expresión regular para validar el formato del correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
export const UpdatePerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, username, password, telefono } = req.body;

    // Validación de campos vacíos
    if (!name && !username && !password && !telefono) {
      return res.status(400).json({ mensaje: 'No se proporcionaron datos para actualizar' });
    }

    // Validación del formato del correo electrónico
    if (username && !isValidEmail(username)) {
      return res.status(400).json({ mensaje: 'El correo electrónico proporcionado no es válido' });
    }
    // Validación del formato del telefono
    if (telefono && telefono.length <=9) {
      return res.status(400).json({ mensaje: 'El telefono no es valido' });
    }
    // Validación de la contraseña
    if (password && password.length < 6) {
      return res.status(400).json({ mensaje: 'La contraseña debe tener al menos 6 caracteres' });
    }

    // Construir el objeto de actualización con los campos proporcionados y no vacíos
    const dataToUpdate = {};
    if (name !== undefined && name !== "") {
      dataToUpdate.name = name;
    }
    if (username !== undefined && username !== "") {
      dataToUpdate.username = username;
    }
    if (telefono !== undefined && telefono !== "") {
      dataToUpdate.telefono = telefono;
    }
    if (password !== undefined && password !== "") {
      dataToUpdate.password = await bcrypt.hash(password, 10);
    }

    // Actualizar el perfil del usuario solo con los campos proporcionados y no vacíos
    const updatedUser = await User.findByIdAndUpdate(id, dataToUpdate, { new: true });

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Usuario o correo ya existente, intente otros datos' });
  }
};