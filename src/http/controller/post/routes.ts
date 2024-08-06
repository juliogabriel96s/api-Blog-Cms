import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";
import { createPost } from "./create-post";

export async function postRoutes(app: FastifyInstance){
    app.addHook('onRequest', verifyJWT)

    app.post('/post/:userId/:categoryId/:tagId', createPost)
}