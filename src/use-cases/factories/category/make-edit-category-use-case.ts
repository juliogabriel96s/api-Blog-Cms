import { PrismaCategoryRepository } from "@/repositories/prisma/prisma-category-repository";
import { EditCategoryUseCase } from "@/use-cases/category/edit-category";

export async function makeEditCategoryUseCase(){
    const categoryRepository = new PrismaCategoryRepository()
    const useCase = new EditCategoryUseCase(categoryRepository)

    return useCase
}