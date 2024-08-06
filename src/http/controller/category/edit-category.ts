import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { makeEditCategoryUseCase } from "@/use-cases/factories/category/make-edit-category-use-case";
import { makeGetCategoryUseCase } from "@/use-cases/factories/category/make-get-category-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function editCategory(request: FastifyRequest, reply: FastifyReply){
    const editCategoryParamsSchema = z.object({
        categoryId: z.coerce.number()
    })

    const editCategoryBodySchema = z.object({
        name: z.string()
    })

    const {categoryId} = editCategoryParamsSchema.parse(request.params)
    const {name} = editCategoryBodySchema.parse(request.body)

    try{
        const editCategoryUseCase = await makeEditCategoryUseCase()

        const category = await editCategoryUseCase.execute({
            categoryId,
            name
        })

        return reply.status(200).send({category})
    }catch(err){
        if(err instanceof ResourceNotFoundError){
        return reply.status(409).send({message: err.message})
        }

        throw err 
    }
}