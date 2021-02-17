import { IResolvers } from "graphql-tools";
//import { Datetime } from "../../lib/datetime";
import bcryptjs from 'bcryptjs';
import {Usuarios}  from '../../schema/modelos/usuario';


const userMutation: IResolvers = {

    Mutation: {

        register: async (root, {user}) => {
         const userCheck = await Usuarios.findOne({ email: user.email });

            if (userCheck !== null) {
                return {
                    status: false,
                    message: `Ya existe existe el usuario ${user.email}`,
                    user: null
                };
            }

        user.password = bcryptjs.hashSync(user.password, 10);

        const nuevoUsuario = new Usuarios(user);              
           
        try{
         await nuevoUsuario.save() 
            return {
                status: true,
                message: `Usuario registrado correctamente  ${user.email}`,
                user: nuevoUsuario
            };
        }catch(err) {
            return {
                status: false,
                message: err.message,
                user: null
            };
        }   
        
        },

        actualizarUsuario: async (_: void, { user }) => {
            const id = user._id     
            
                      
            try{

                user.updateAt = Date.now;
                
                if ( user.password ) {

                    user.password = bcryptjs.hashSync(user.password, 10);
                }

                const userUp =  await Usuarios.findByIdAndUpdate(id, user, {new: true});
               

                return {
                    status: true,
                    message: `Usuario actualizado correctamente  ${user.email}`,
                    user: userUp
                };
            
            }catch(err) {
                return {
                    status: false,
                    message: 'Error en el proceso' + err.message,
                    user: null
                };
            }
            
        },
        actualizaImagen: async(_: void, { user }) => {

            const id = user._id              
          
            try{

                user.updateAt = Date.now;

                const userUp =  await Usuarios.findByIdAndUpdate(id, user, {new: true});
               

                return {
                    status: true,
                    message: `Usuario actualizado correctamente  ${user.email}`,
                    user: userUp
                };
            
            }catch(err) {
                return {
                    status: false,
                    message: 'Error en el proceso' + err.message,
                    user: null
                };
            }

        },

        eliminarUsuario: async(_: void, { id }) => {
            try{
                const userUp =  await Usuarios.findByIdAndDelete(id);
            
                if(!userUp) {
                    return {
                        status: false,
                        message: 'Usuario no encontrado',
                        user: null
                    };
                };

                return {
                    status: true,
                    message: `Usuario eliminado correctamente  `,
                    user: userUp
                };
            
            }catch(err) {
                return {
                    status: false,
                    message: 'Error en el proceso' + err.message,
                    user: null
                };
            }
            

        },
    }
}

export default userMutation;