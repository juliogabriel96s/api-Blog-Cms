import { Either, left, right } from "@/core/either"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { PostRepository } from "@/repositories/post-repository"
import { Post } from "@prisma/client"

interface GetPostUseCaseRequest{
   postId: number
}

type GetPostUseCaseResponse = Either<
ResourceNotFoundError,
{
    post: Post
}>

export class GetPostUseCase{
    constructor(
        private postRepository: PostRepository,
    ){}

    async execute({
        postId
    }:GetPostUseCaseRequest):Promise<GetPostUseCaseResponse>{
       const post = await this.postRepository.findById(postId)

       if(!post){
        return left(new ResourceNotFoundError())
       }

        return right({
            post
        })
    }
}