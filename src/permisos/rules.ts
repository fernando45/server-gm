import { rule} from 'graphql-shield';
//import { Context, getUserEmail } from '../utils'

const isAdmin = rule({ cache: 'contextual' })(
    async (parent, args, ctx, info) => {
      return ctx.user.isAdmin
    },
  )
export const isAuthenticated = rule({ cache: 'contextual' })(
    async (parent, args, ctx, info) => {    
      return ctx.user !== null      
    },
  )

