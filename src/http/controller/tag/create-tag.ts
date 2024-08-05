import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { makeCreateTagUseCase } from "@/use-cases/factories/tag/make-create-tag-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createTag(request: FastifyRequest, reply: FastifyReply){
    const createTagSchema = z.object({
        name: z.string()
    })

    const {name} = createTagSchema.parse(request.body)

    try{
        const createTagUseCase = makeCreateTagUseCase()

        const tag = await createTagUseCase.execute({
            name
        })

        return reply.status(201).send({tag})
    }catch(err){
        if(err instanceof NotAllowedError){
        return reply.status(409).send({message: err.message})
        }

        throw err 
    }
}