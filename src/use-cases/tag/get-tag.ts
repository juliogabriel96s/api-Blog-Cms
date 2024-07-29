import { Either, left, right } from "@/core/either"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { TagRepository } from "@/repositories/tag-repository"
import { Tag } from "@prisma/client"

interface GetTagUseCaseRequest{
    tagId: number
}

type GetTagUseCaseResponse = Either<
ResourceNotFoundError,
{
    tag: Tag
}>

export class GetTagUseCase{
    constructor(private tagRepository: TagRepository){}

    async execute({
       tagId
    }:GetTagUseCaseRequest): Promise<GetTagUseCaseResponse>{
        const tag = await this.tagRepository.findById(tagId)

        if(!tag){
            return left(new ResourceNotFoundError())
        }

        return right({
            tag
        })
    }
}