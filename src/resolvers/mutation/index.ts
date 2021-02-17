import GMR from "graphql-merge-resolvers";
import userMutation from "./userMutation";
import clienteMutation from "./clienteMutation";

const resolversMutation = GMR.merge(
    [
        userMutation,
        clienteMutation
    ]

);

export default resolversMutation;