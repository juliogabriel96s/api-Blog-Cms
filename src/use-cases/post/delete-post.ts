import { Either, left, right } from "@/core/either"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { PostRepository } from "@/repositories/post-repository"

interface DeletePostUseCaseRequest{
   postId: number
}

type DeletePostUseCaseResponse = Either<
ResourceNotFoundError,
{}
>

export class DeletePostUseCase{
    constructor(
        private postRepository: PostRepository,
    ){}

    async execute({
        postId
    }:DeletePostUseCaseRequest):Promise<DeletePostUseCaseResponse>{
       const post = await this.postRepository.findById(postId)

       if(!post){
        return left(new ResourceNotFoundError())
       }


       await this.postRepository.delete(post)

        return right({})
    }
}