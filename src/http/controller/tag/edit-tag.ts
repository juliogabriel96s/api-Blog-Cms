import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { makeEditTagUseCase } from "@/use-cases/factories/tag/make-edit-tag-use-case";
import { makeGetTagUseCase } from "@/use-cases/factories/tag/make-get-tag-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function editTag(request: FastifyRequest, reply: FastifyReply){
    const editTagParamsSchema = z.object({
        tagId: z.coerce.number()
    })

    const editTagBodySchema = z.object({
        name: z.string()
    })

    const {tagId} = editTagParamsSchema.parse(request.params)
    const {name} = editTagBodySchema.parse(request.body)

    try{
        const editTagUseCase = makeEditTagUseCase()

        const tag = await editTagUseCase.execute({
            tagId,
            name
        })

        return reply.status(200).send({tag})
    }catch(err){
        if(err instanceof ResourceNotFoundError){
        return reply.status(409).send({message: err.message})
        }

        throw err 
    }
}