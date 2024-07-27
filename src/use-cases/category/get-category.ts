import { Either, left, right } from "@/core/either"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { CategoryRepository } from "@/repositories/category-repository"
import { Category } from "@prisma/client"

interface GetCategoryUseCaseRequest{
    categoryId: number
}

type GetCategoryUseCaseResponse = Either<
ResourceNotFoundError,
{
    category: Category
}>

export class GetCategoryUseCase{
    constructor(private categoryRepository: CategoryRepository){}

    async execute({
      categoryId
    }: GetCategoryUseCaseRequest): Promise<GetCategoryUseCaseResponse>{
        const category = await this.categoryRepository.findById(categoryId)

        if(!category){
            return left(new ResourceNotFoundError())
        }

        return right({
            category
        })
    }
}