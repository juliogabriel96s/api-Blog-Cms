import { PrismaCategoryRepository } from "@/repositories/prisma/prisma-category-repository";
import { CreateCategoryUseCase } from "@/use-cases/category/create-category";

export async function makeCreateCategoryUseCase(){
    const categoryRepository = new PrismaCategoryRepository()
    const useCase = new CreateCategoryUseCase(categoryRepository)

    return useCase
}