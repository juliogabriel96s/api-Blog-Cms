import { Either, left, right } from "@/core/either"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { CategoryRepository } from "@/repositories/category-repository"
import { Category } from "@prisma/client"

interface EditCategoryUseCaseRequest{
    categoryId: number
    name: string
}

type EditCategoryUseCaseResponse = Either<
ResourceNotFoundError,
{
    category: Category
}>

export class EditCategoryUseCase{
    constructor(private categoryRepository: CategoryRepository){}

    async execute({
        categoryId,
        name
    }:EditCategoryUseCaseRequest):Promise<EditCategoryUseCaseResponse>{
        const category = await this.categoryRepository.findById(categoryId)

        if(!category){
            return left(new ResourceNotFoundError())
        }

        category.name = name

        await this.categoryRepository.save(category)

        return right({
            category
        })
    }
}