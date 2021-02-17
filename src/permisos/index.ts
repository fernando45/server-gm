import { shield } from 'graphql-shield';
import * as rules from './rules';
// import { isAuthenticated } from './rules';

export const permisos = shield({

    Query: {
          users: rules.isAuthenticated,
          userPorEmail: rules.isAuthenticated,
          userPorId: rules.isAuthenticated,
          renuevaToken: rules.isAuthenticated,
          // clientes: rules.isAuthenticated

        },

    Mutation: {
        actualizarUsuario: rules.isAuthenticated,
        eliminarUsuario: rules.isAuthenticated           
    }
    
})

