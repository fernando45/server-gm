import express from 'express';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import environments from './config/environments';
import expressPlayground from 'graphql-playground-middleware-express';
import mongoose from 'mongoose';
import JWT from './lib/jwt';


if (process.env.NODE_ENV !== 'production') {
    const envs = environments;
    // console.log(envs);
}

async function init() {
    const app = express();

    app.use('*', cors());

    app.use(compression());

   // const database = new Database();
   // const db = await database.init();

    // Conexion con mongoose.
    const MONGODB = String(process.env.DATABASE);
    mongoose.connection.openUri(MONGODB, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false  }, (err, res) => {
   
    if (err) throw err;
    console.log(' Base de datos online: \x1b[32m%s\x1b[0m', 'online');

    });

    const context: any = async({req,connection}: any) => {
         const token = req ? req.headers.authorization : connection.authorization;
         const user = getUser(token);
        // return { db, token, user };
        return { token, user };
    };
    
    function getUser(token: any) {
        let info: any = new JWT().verify(token);
        if (info === 'La autenticación del token es inválida. Por favor, inicia sesión para obtener un nuevo token') {
            return  null            
        }
        return  info.user       

    };
    

    const server = new ApolloServer({
        schema,
        context,
        introspection: true       
       
    });

    server.applyMiddleware({ app });
    

    app.use('/', expressPlayground({
        endpoint: '/graphql'
    }));
    
    const PORT = process.env.PORT || 5300;
    const httpServer = createServer(app);
    httpServer.listen(
        { port: PORT },
        () => console.log(`Sistema de Autenticación JWT API GraphQL http://localhost:${PORT}/graphql`)
    );
}

init();