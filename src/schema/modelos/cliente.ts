import * as mongoose from 'mongoose';



const documentosValidos = {
    values: ['DNI', 'CIF', 'NIF', 'NIE'],
    message: '{VALUE} no es un rol válido',
};

const tipoContacto = {
    values: ['telefono', 'web', 'email',  'movil'],
    message: '{VALUE} no es un tipo válido',
};


const clienteSchema = new mongoose.Schema({

    documentos: {
        type: String,               
        enum: documentosValidos,
    },

    documento: {
        type: String
    },

   
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
        min: [6, 'Debe estar comprendido entre 6 a 20 caracteres'],
        max: [20, 'Debe estar comprendido entre 6 a 20 caracteres'],
    },

    contacto: [{
        _id: {type: String },
        tipo: { type: tipoContacto},
        valor: {type: String},
        admin: { type: Boolean},
        direccion: { type: Boolean },
        comercial: { type: Boolean }
    }],     
   
    estado: {
        type: Boolean,        
    },
   
    registerDate: { type: Date, default: Date.now },
    modified_at: {type: Date, default: Date.now},

});

export interface ICliente extends mongoose.Document {
    documentos: string,
    documento: string,
    nombre: string,
    contacto: [string]    
  }

const Clientes = mongoose.model<ICliente>('clientes', clienteSchema);
export  { Clientes };

