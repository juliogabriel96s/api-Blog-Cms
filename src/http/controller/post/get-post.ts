import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { makeGetPostUseCase } from "@/use-cases/factories/post/make-get-post-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPost(request: FastifyRequest, reply: FastifyReply){
   
    const getPostParamsSchema = z.object({
        postId: z.coerce.number()
    })

    const {postId} = getPostParamsSchema.parse(request.params)

    try{
        const getPostUseCase = makeGetPostUseCase()

        const post = await getPostUseCase.execute({
            postId
        })

        return reply.status(200).send({post})
    }catch(err){
        if(err instanceof ResourceNotFoundError){
        return reply.status(409).send({message: err.message})
        }

        throw err 
    }
}