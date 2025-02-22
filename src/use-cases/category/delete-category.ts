import { Either, left, right } from "@/core/either"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { CategoryRepository } from "@/repositories/category-repository"

interface DeleteCategoryUseCaseRequest{
    categoryId: number
}

type DeleteCategoryUseCaseResponse = Either<
ResourceNotFoundError,
{}
>

export class DeleteCategoryUseCase{
    constructor(private categoryRepository: CategoryRepository){}

    async execute({
        categoryId
    }: DeleteCategoryUseCaseRequest): Promise<DeleteCategoryUseCaseResponse>{
        const category = await this.categoryRepository.findById(categoryId)

        if(!category){
            return left(new ResourceNotFoundError())
        }

        await this.categoryRepository.delete(category)

        return right({})
    }
}