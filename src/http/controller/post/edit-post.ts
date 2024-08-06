import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { makeEditPostUseCase } from "@/use-cases/factories/post/make-edit-post-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function editPost(request: FastifyRequest, reply: FastifyReply){
   
    const editPostParamsSchema = z.object({
        postId: z.coerce.number()
    })

    const editPostBodySchema = z.object({
        title: z.string(),
        content: z.string()
    })

    const {postId} = editPostParamsSchema.parse(request.params)
    const {title, content} = editPostBodySchema.parse(request.body)


    try{
        const editPostUseCase = makeEditPostUseCase()

        const post = await editPostUseCase.execute({
            postId,
            title,
            content
        })

        return reply.status(200).send({post})
    }catch(err){
        if(err instanceof ResourceNotFoundError){
        return reply.status(409).send({message: err.message})
        }

        throw err 
    }
}