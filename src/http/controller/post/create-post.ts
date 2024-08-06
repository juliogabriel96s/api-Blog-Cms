import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { makeCreatePostUseCase } from "@/use-cases/factories/post/make-create-post-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createPost(request: FastifyRequest, reply: FastifyReply){
    const createPostBodySchema = z.object({
        title: z.string(),
        content: z.string()
    })

    const createPostParamsSchema = z.object({
        userId: z.string(),
        categoryId: z.coerce.number(),
        tagId: z.coerce.number()
    })

    const {title, content} = createPostBodySchema.parse(request.body)
    const {userId, categoryId, tagId} = createPostParamsSchema.parse(request.params)

    try{
        const createPostUseCase = makeCreatePostUseCase()

        const post = await createPostUseCase.execute({
            title,
            content,
            userId,
            categoryId,
            tagId
        })

        return reply.status(201).send({post})
    }catch(err){
        if(err instanceof ResourceNotFoundError){
        return reply.status(409).send({message: err.message})
        }

        throw err 
    }
}