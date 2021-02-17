import { GraphQLSchema } from "graphql";
import { applyMiddleware } from 'graphql-middleware';
import resolvers from '../resolvers';
import { makeExecutableSchema } from "graphql-tools";
import { permisos } from '../permisos/index';

// ./graphql/typeDefs.js
import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import  { mergeTypeDefs } from '@graphql-tools/merge';

const typesArray = loadFilesSync(path.join(__dirname, './**/*.graphql'));

const typeDefs = mergeTypeDefs(typesArray);


//const typeDefs = mergeTypes(fileLoader(`${__dirname}/**/*.graphql`), {all: true} );

let schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers      
      
});

schema = applyMiddleware(schema, permisos);
export default schema;