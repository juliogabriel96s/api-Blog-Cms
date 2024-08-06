import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { makeCreateCategoryUseCase } from "@/use-cases/factories/category/make-create-category-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createCategory(request: FastifyRequest, reply: FastifyReply){
    const createCategoryBodySchema = z.object({
        name: z.string()
    })

    const {name} = createCategoryBodySchema.parse(request.body)

    try{
        const createCategoryUseCase = await makeCreateCategoryUseCase()

        const category = await createCategoryUseCase.execute({
            name
        })

        return reply.status(201).send({category})
    }catch(err){
        if(err instanceof ResourceNotFoundError){
        return reply.status(409).send({message: err.message})
        }

        throw err 
    }
}