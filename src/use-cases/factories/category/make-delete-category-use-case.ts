import { PrismaCategoryRepository } from "@/repositories/prisma/prisma-category-repository";
import { DeleteCategoryUseCase } from "@/use-cases/category/delete-category";

export async function makeDeleteCategoryUseCase(){
    const categoryRepository = new PrismaCategoryRepository()
    const useCase = new DeleteCategoryUseCase(categoryRepository)

    return useCase
}