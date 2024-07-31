import { PrismaCategoryRepository } from "@/repositories/prisma/prisma-category-repository";
import { GetCategoryUseCase } from "@/use-cases/category/get-category";

export async function makeGetCategoryUseCase(){
    const categoryRepository = new PrismaCategoryRepository()
    const useCase = new GetCategoryUseCase(categoryRepository)

    return useCase
}