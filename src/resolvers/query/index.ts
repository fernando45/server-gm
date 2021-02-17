import GMR from "graphql-merge-resolvers";
import queryUser from "./usuario";
import queryCliente from "./cliente";


const queryResolvers = GMR.merge(
    [
        queryUser,
        queryCliente
    ]

);
export default queryResolvers;