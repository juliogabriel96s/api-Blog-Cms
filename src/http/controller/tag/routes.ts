import { FastifyInstance } from "fastify";
import { createTag } from "./create-tag";
import { verifyJWT } from "../middlewares/verify-jwt";
import { verifyUserRole } from "../middlewares/verify-user-role";
import { getTag } from "./get-tag";
import { editTag } from "./edit-tag";
import { deleteTag } from "./delete-tag";

export async function tagRoutes(app: FastifyInstance){
    app.addHook('onRequest', verifyJWT)

    app.get(`/tag/:tagId`, getTag)
    app.post('/tag',{onRequest:[verifyUserRole('ADMIN')]} ,createTag) 
    app.put('/tag/:tagId',{onRequest:[verifyUserRole('ADMIN')]}  ,editTag)
    app.delete('/tag/:tagId',{onRequest:[verifyUserRole('ADMIN')]} ,deleteTag)
   
}