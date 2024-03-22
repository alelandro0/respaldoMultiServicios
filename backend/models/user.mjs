import Mongoose from "mongoose";
import getUserInfo from "../lib/getUserInfo.mjs";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../auth/generateTokens.mjs";
import Token from "../models/token.mjs";

const UserSchema = new Mongoose.Schema({
  id: { type: Object },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  imageProfile: { type: String },
  portada: { type: String },
  telefono: { type: String },
  publication: [{
    _id: { type: Mongoose.Schema.Types.ObjectId, auto: true },
    profesionalId:{type:String},
    image: { type: String, required: true },
    description: String,
    estado: { type: Boolean },
    createdAt: { type: Date, default: Date.now }
  }],
  roll: { type: String },
  estado: { type: Boolean }
});

// Hook pre para actualizar la fecha de creación de la publicación antes de guardarla
UserSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("publication") && user.publication.length > 0) {
    const lastIndex = user.publication.length - 1;
    user.publication[lastIndex].createdAt = new Date();
  }
  next();
});

UserSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew) {
    const document = this;

    bcrypt.hash(document.password, 10, (err, hash) => {
      if (err) {
        next(err);
      } else {
        document.password = hash;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.usernameExist = async function (username) {
  const result = await Mongoose.model("User").find({ username });
  return result.length > 0;
};

UserSchema.methods.comparePassword = async function (password, hash) {
  const same = await bcrypt.compare(password, hash);
  return same;
};

UserSchema.methods.createAccessToken = function () {
  return generateAccessToken(getUserInfo(this));
};

UserSchema.methods.createRefreshToken = async function () {
  const refreshToken = generateRefreshToken(getUserInfo(this));
  try {
    await new Token({ token: refreshToken }).save();

    return refreshToken;
  } catch (error) {
    console.log(error);
  }
};

UserSchema.statics.actualizarTelefonos = async function () {
  try {
    // Encuentra todos los usuarios que no tienen el campo 'telefono' definido
    const usuariosSinTelefono = await this.find({ telefono: { $exists: false } });

    // Itera sobre los usuarios encontrados y agrega el campo 'telefono'
    for (const usuario of usuariosSinTelefono) {
      usuario.telefono = '1234567890'; // Asigna el valor que desees para el campo 'telefono'
      await usuario.save(); // Guarda el usuario actualizado
    }

  } catch (error) {
    console.error('Error al actualizar los teléfonos:', error);
  }
};
export default Mongoose.model("User", UserSchema);
