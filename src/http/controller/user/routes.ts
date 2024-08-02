import { FastifyInstance } from "fastify";
import { registerUser } from "./register";
import { authenticateUser } from "./authenticate";

export async function userRoutes(app: FastifyInstance){
    app.post('/user', registerUser)
    app.post('/sessions', authenticateUser)
}