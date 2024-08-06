import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";
import { createPost } from "./create-post";
import { getPost } from "./get-post";
import { editPost } from "./edit-post";
import { deletePost } from "./delete-post";

export async function postRoutes(app: FastifyInstance){
    app.addHook('onRequest', verifyJWT)

    app.post('/post/:userId/:categoryId/:tagId', createPost)
    app.get('/post/:postId', getPost)
    app.put('/post/:postId', editPost)
    app.delete('/post/:postId', deletePost)
}