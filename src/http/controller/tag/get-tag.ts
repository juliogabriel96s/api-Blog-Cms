import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { makeGetTagUseCase } from "@/use-cases/factories/tag/make-get-tag-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getTag(request: FastifyRequest, reply: FastifyReply){
    const getTagParamsSchema = z.object({
        tagId: z.coerce.number()
    })

    const {tagId} = getTagParamsSchema.parse(request.params)

    try{
        const getTagUseCase = makeGetTagUseCase()

        const tag = await getTagUseCase.execute({
            tagId
        })

        return reply.status(200).send({tag})
    }catch(err){
        if(err instanceof ResourceNotFoundError){
        return reply.status(409).send({message: err.message})
        }

        throw err 
    }
}