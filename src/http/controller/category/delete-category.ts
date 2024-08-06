import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { makeDeleteCategoryUseCase } from "@/use-cases/factories/category/make-delete-category-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteCategory(request: FastifyRequest, reply: FastifyReply){
    const deleteCategoryParamsSchema = z.object({
        categoryId: z.coerce.number()
    })


    const {categoryId} = deleteCategoryParamsSchema.parse(request.params)

    try{
        const deleteCategoryUseCase = await makeDeleteCategoryUseCase()

            await deleteCategoryUseCase.execute({
            categoryId
        })

        return reply.status(204).send()
    }catch(err){
        if(err instanceof ResourceNotFoundError){
        return reply.status(409).send({message: err.message})
        }

        throw err 
    }
}