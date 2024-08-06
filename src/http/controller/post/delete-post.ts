import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { makeDeletePostUseCase } from "@/use-cases/factories/post/make-delete-post-use-case";
import { makeGetPostUseCase } from "@/use-cases/factories/post/make-get-post-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deletePost(request: FastifyRequest, reply: FastifyReply){
   
    const getPostParamsSchema = z.object({
        postId: z.coerce.number()
    })

    const {postId} = getPostParamsSchema.parse(request.params)

    try{
        const deletePostUseCase = makeDeletePostUseCase()

         await deletePostUseCase.execute({
            postId
        })

        return reply.status(204).send()
    }catch(err){
        if(err instanceof ResourceNotFoundError){
        return reply.status(409).send({message: err.message})
        }

        throw err 
    }
}