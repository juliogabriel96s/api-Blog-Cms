import { Either, left, right } from "@/core/either"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { TagRepository } from "@/repositories/tag-repository"
import { Tag } from "@prisma/client"

interface CreateTagUseCaseRequest{
    name: string
}

type CreateTagUseCaseResponse = Either<
NotAllowedError,
{
    tag: Tag
}>

export class CreateTagUseCase{
    constructor(private tagRepository: TagRepository){}

    async execute({
        name
    }: CreateTagUseCaseRequest): Promise<CreateTagUseCaseResponse>{
        const sameName = await this.tagRepository.findByName(name)

        if(sameName){
            return left(new NotAllowedError())
        }

        const tag = await this.tagRepository.create({
            name
        })

        return right({
            tag
        })
    }
}