import { Either, left, right } from "@/core/either"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { PostRepository } from "@/repositories/post-repository"
import { Post } from "@prisma/client"

interface EditPostUseCaseRequest{
   postId: number
   title: string
   content: string
}

type EditPostUseCaseResponse = Either<
ResourceNotFoundError,
{
    post: Post
}>

export class EditPostUseCase{
    constructor(
        private postRepository: PostRepository,
    ){}

    async execute({
        postId,
        title,
        content
    }:EditPostUseCaseRequest):Promise<EditPostUseCaseResponse>{
       const post = await this.postRepository.findById(postId)

       if(!post){
        return left(new ResourceNotFoundError())
       }

       post.title = title
       post.content = content

       await this.postRepository.save(post)

        return right({
            post
        })
    }
}