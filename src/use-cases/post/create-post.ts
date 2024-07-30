import { Either, left, right } from "@/core/either"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { CategoryRepository } from "@/repositories/category-repository"
import { PostRepository } from "@/repositories/post-repository"
import { TagRepository } from "@/repositories/tag-repository"
import { UserRepository } from "@/repositories/user-repository"
import { Post } from "@prisma/client"

interface CreatePostUseCaseRequest{
    title: string
    content: string
    userId: string
    categoryId: number
    tagId: number
}

type CreatePostUseCaseResponse = Either<
ResourceNotFoundError,
{
    post: Post
}>

export class CreatePostUseCase{
    constructor(
        private postRepository: PostRepository,
        private userRepository: UserRepository,
        private categoryRepository: CategoryRepository,
        private tagRepository: TagRepository
    ){}

    async execute({
        title,
        content,
        userId,
        categoryId,
        tagId
    }:CreatePostUseCaseRequest):Promise<CreatePostUseCaseResponse>{
        const user = await this.userRepository.findById(userId)

        if(!user){
          return left(new ResourceNotFoundError())
        }

        const category = await this.categoryRepository.findById(categoryId)

        if(!category){
            return left(new ResourceNotFoundError())
        }

        const tag = await this.tagRepository.findById(tagId)

        if(!tag){
            return left(new ResourceNotFoundError())
        }

        const post = await this.postRepository.create({
            title,
            content,
            userId,
            categoryId,
            tagId
        })

        return right({
            post
        })
    }
}