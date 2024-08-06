import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { userRoutes } from "./http/controller/user/routes";
import fastifyJwt from "@fastify/jwt";
import { tagRoutes } from "./http/controller/tag/routes";
import { categoryRoutes } from "./http/controller/category/routes";
import { postRoutes } from "./http/controller/post/routes";

export const app = fastify()

app.register(fastifyJwt,{
    secret: env.JWT_SECRET,
    sign:{
        expiresIn: '10m'
    }
})

app.register(userRoutes)
app.register(tagRoutes)
app.register(categoryRoutes)
app.register(postRoutes)

app.setErrorHandler((error, request, reply) =>{
if(error instanceof ZodError){
    return reply
    .status(400)
    .send({message: "Validation error", issues: error.format()})
}

if(env.NODE_ENV !== 'production'){
    console.error(error)
}else{

}

return reply.status(500).send({message: 'Internal server error.'})
})