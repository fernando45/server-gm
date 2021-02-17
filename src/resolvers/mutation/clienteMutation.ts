import { IResolvers } from "graphql-tools";
//import { Datetime } from "../../lib/datetime";
import bcryptjs from 'bcryptjs';
import {Clientes} from '../../schema/modelos/cliente';


const clienteMutation: IResolvers = {

    Mutation: {

        registroCliente: async (root, {cliente}) => {
            const userCheck = await Clientes.findOne({ documento: cliente.documento });
   
               if (userCheck !== null) {
                   return {
                       status: false,
                       message: `Ya existe existe el cliente ${cliente.documento}`,
                       user: null
                   };
               }
   
           // user.password = bcryptjs.hashSync(user.password, 10);
   
           const nuevoCliente = new Clientes(cliente);              
              
           try{
            await nuevoCliente.save() 
               return {
                   status: true,
                   message: `Usuario registrado correctamente  ${cliente.documento}`,
                   cliente: nuevoCliente
               };
           }catch(err) {
               return {
                   status: false,
                   message: err.message,
                   cliente: null
               };
           }   
           
           },

    }

}

export default clienteMutation;