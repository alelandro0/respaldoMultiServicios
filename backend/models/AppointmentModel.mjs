// AppointmentModel.mjs

import mongoose from 'mongoose';

const { Schema } = mongoose;

const citaSchema = new Schema({
    ProfesionalId:{type: mongoose.Schema.Types.ObjectId},
    nombre:{type: String},
    nombreCliente:{type:String},
    date: { type: Date, required: true },
    hora: { type: String, require:true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId},
    estado: { type: String }
});

const Cita = mongoose.model('Cita', citaSchema);

export default Cita; // Exporta el modelo de cita como default

