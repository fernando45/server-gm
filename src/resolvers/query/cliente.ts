import { IResolvers } from "graphql-tools";
import bcryptjs from 'bcryptjs';
import { rejects } from "assert";
import JWT from '../../lib/jwt';
import {Clientes} from '../../schema/modelos/cliente'


let filtro : string ='';
const queryCliente : IResolvers = {

    Query : {

        clientes: async(root, {skip = 0, limit = -1, orden = '', filter } ) => {          
            
        try{

            var fil: any;
            const result = await Clientes.find({fil})        
            .sort(orden)            
            .skip(skip)            
            .limit(limit)
               
            filtro = filter;
            
            
            return {
                status: true,
                message: 'Lista obtenida correctamente',
                cliente: result                                 
            };
            

        }catch(err){
            
            return {
                status: false,
                message: 'Problemas para obtener la lista ' + err.message,
                cliente: [null]                
            };
        }

    },

    totalCount: (root) => {
        return new Promise((resolve, object) => {
            Clientes.countDocuments([filtro], (error, count) => {
                if(error) rejects(error)
                else resolve(count)
            })
        })
    }
       

    }
}



export default queryCliente;