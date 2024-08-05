import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { makeDeleteTagUseCase } from "@/use-cases/factories/tag/make-delete-tag-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteTag(request: FastifyRequest, reply: FastifyReply){
    const deliteTagParamsSchema = z.object({
        tagId: z.coerce.number()
    })


    const {tagId} = deliteTagParamsSchema.parse(request.params)

    try{
        const deleteTagUseCase = makeDeleteTagUseCase()

            await deleteTagUseCase.execute({
            tagId
        })

        return reply.status(204).send()
    }catch(err){
        if(err instanceof ResourceNotFoundError){
        return reply.status(409).send({message: err.message})
        }

        throw err 
    }
}