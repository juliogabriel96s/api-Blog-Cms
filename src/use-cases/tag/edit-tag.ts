import { Either, left, right } from "@/core/either"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { TagRepository } from "@/repositories/tag-repository"
import { Tag } from "@prisma/client"

interface EditTagUseCaseRequest{
    tagId: number
    name:string
}

type EditTagUseCaseResponse = Either<
ResourceNotFoundError,
{
    tag: Tag
}
>

export class EditTagUseCase{
    constructor(private tagRepository: TagRepository){}

    async execute({
      tagId,
      name
    }: EditTagUseCaseRequest): Promise<EditTagUseCaseResponse>{
        const tag = await this.tagRepository.findById(tagId)

        if(!tag){
            return left(new ResourceNotFoundError())
        }

        tag.name = name

        await this.tagRepository.save(tag)

        return right({
            tag
        })
    }
}