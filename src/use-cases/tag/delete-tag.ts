import { Either, left, right } from "@/core/either"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { TagRepository } from "@/repositories/tag-repository"

interface DeleteTagUseCaseRequest{
    tagId: number
}

type DeleteTagUseCaseResponse = Either<
ResourceNotFoundError,
{}
>

export class DeleteTagUseCase{
    constructor(private tagRepository: TagRepository){}

    async execute({
        tagId
    }: DeleteTagUseCaseRequest): Promise<DeleteTagUseCaseResponse>{
        const tag = await this.tagRepository.findById(tagId)

        if(!tag){
            return left(new ResourceNotFoundError())
        }

        await this.tagRepository.delete(tag)

        return right({})
    }
}