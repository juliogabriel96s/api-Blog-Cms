import { Either, left, right } from "@/core/either"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { CategoryRepository } from "@/repositories/category-repository"
import { Category } from "@prisma/client"

interface CreateCategoryUseCaseRequest{
    name:string
}

type CreateCategoryUseCaseResponse = Either<
ResourceNotFoundError,
{
    category: Category
}>

export class CreateCategoryUseCase{
    constructor(private categoryRepository: CategoryRepository){}

    async execute({
    name
    }: CreateCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse>{
        const sameName = await this.categoryRepository.findByName(name)
        
        if(sameName){
            return left(new ResourceNotFoundError())
        }

        const category = await this.categoryRepository.create({
            name
        })

        return right({
            category
        })
    }
}