import { IResolvers } from "graphql-tools";
import bcryptjs from 'bcryptjs';
import {Usuarios}  from '../../schema/modelos/usuario';
import { rejects } from "assert";
import JWT from '../../lib/jwt';



let filtro : string ='';
const queryUser : IResolvers = {
    Query : {
      
        users: async(root, {skip = 0, limit = -1, orden = '', filter } ) => {          
            console.log( 'esto es : ' + orden )  ;
        try{

            var fil: any;
            const result = await Usuarios.find({fil})        
            .sort(orden)            
            .skip(skip)            
            .limit(limit)
               
            filtro = filter;
            
            
            return {
                status: true,
                message: 'Lista obtenida correctamente',
                user: result                                 
            };
            

        }catch(err){
            
            return {
                status: false,
                message: 'Problemas para obtener la lista ' + err.message,
                user: [null]                
            };
        }
        }, 
        
        userPorId: async(_: void, { id })  => {
            try {
            const result = await Usuarios.findById(id)  
                return {
                    status: true,
                    message: 'Usuario encontrado',
                    user: result                        
                };

            }catch(err){
                return {
                    status: false,
                    message: 'usuario no encontrado ' + err.message,
                    user: null                       
                };
            }         
            
        },

        userPorEmail: async(_: void, { email })  => {
            try {
                
            const result = await Usuarios.findOne({email})  

            if(result === null) {
                return {
                    status: false,
                    message: 'usuario no encontrado ',
                    user: null                       
                };
            }
                return {
                    status: true,
                    message: 'Usuario encontrado',
                    user: result                        
                };

            }catch(err){
                return {
                    status: false,
                    message: 'usuario no encontrado ' + err.message,
                    user: null                       
                };
            }         
            
        },
         
        totalCount: (root) => {
            return new Promise((resolve, object) => {
                Usuarios.countDocuments([filtro], (error, count) => {
                    if(error) rejects(error)
                    else resolve(count)
                })
            })
        },
        login: async( _: void, {email, password }) => {
            
            const user = await Usuarios.findOne({email});
         

            if (user === null) {
                return {
                    status: false,
                    message: 'Login INCORRECTO. No existe el usuario',
                    token: null,
                    //menu: null,
                    user: null
                }
            }
           
            if (!bcryptjs.compareSync(password, user.password)) {
                return {
                    status: false,
                    message: 'Login INCORRECTO. Contraseña incorrecta',
                    token: null,                  
                    user: null
                }
            }                
            
            user.password='';            
           
            return {
                status: true,
                message: 'Login Correcto',
                token: new JWT().sign({ user }),           
                user: user
            }

        },   
        
        renuevaToken: async( _: void, {email}) => {
            const user = await Usuarios.findOne({email});

            if (user === null) {
                return {
                    status: false,
                    message: 'Login INCORRECTO. No existe el usuario',
                    token: null,
                    //menu: null,
                    user: null
                }
            }

            user.password='';            
           
            return {
                status: true,
                message: 'Login Correcto',
                token: new JWT().sign({ user }),           
                user: user
            }
        },
      

        me(_: void, __: any, { token }) {
            let info: any = new JWT().verify(token);
          
            if (info === 'La autenticación del token es inválida. Por favor, inicia sesión para obtener un nuevo token') {
                return {
                    status: false,
                    message: info,                                     
                    user: null
                }
            }
            return {
                status: true,
                message: 'Token correcto',            
                user: info.user
            }
        }
    }
}

export default queryUser;