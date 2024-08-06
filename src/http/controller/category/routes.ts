import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";
import { createCategory } from "./create-category";
import { verifyUserRole } from "../middlewares/verify-user-role";
import { getCategory } from "./get-category";
import { editCategory } from "./edit-category";
import { deleteCategory } from "./delete-category";

export async function categoryRoutes(app: FastifyInstance){
    app.addHook('onRequest', verifyJWT)

    app.post('/category',{onRequest:[verifyUserRole('ADMIN')]} , createCategory)
    app.get('/category/:categoryId', getCategory)
    app.put('/category/:categoryId',{onRequest:[verifyUserRole('ADMIN')]},editCategory)
    app.delete('/category/:categoryId',{onRequest:[verifyUserRole('ADMIN')]}, deleteCategory)

}