import * as mongoose from 'mongoose';


const rolesValidos = {
    values: ['ADMIN', 'SUPERVISOR', 'CLIENTE', 'USUARIO', 'PASAPORTE', 'OTRO', 'NO CENSADO'],
    message: '{VALUE} no es un documento válido',
};

const usuarioSchema = new mongoose.Schema({

   
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
        min: [6, 'Debe estar comprendido entre 6 a 20 caracteres'],
        max: [20, 'Debe estar comprendido entre 6 a 20 caracteres'],
    },
    apellidos: {
        type: String      
    },

    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
        // required: false,
    },
    role: {
        type: String,
        default: 'USUARIO',        
        enum: rolesValidos,
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
    registerDate: { type: Date, default: Date.now },
    modified_at: {type: Date, default: Date.now},

});

export interface IUsuario extends mongoose.Document {
    nombre: string,
    email: string,
    password: string,
    role: string,
  }

const Usuarios = mongoose.model<IUsuario>('usuarios', usuarioSchema);
export  { Usuarios };

