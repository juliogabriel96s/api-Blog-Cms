import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { makeGetCategoryUseCase } from "@/use-cases/factories/category/make-get-category-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getCategory(request: FastifyRequest, reply: FastifyReply){
    const createCategoryParamsSchema = z.object({
        categoryId: z.coerce.number()
    })

    const {categoryId} = createCategoryParamsSchema.parse(request.params)

    try{
        const getCategoryUseCase = await makeGetCategoryUseCase()

        const category = await getCategoryUseCase.execute({
            categoryId
        })

        return reply.status(200).send({category})
    }catch(err){
        if(err instanceof ResourceNotFoundError){
        return reply.status(409).send({message: err.message})
        }

        throw err 
    }
}