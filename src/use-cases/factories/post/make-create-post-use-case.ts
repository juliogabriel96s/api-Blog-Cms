import { PrismaCategoryRepository } from "@/repositories/prisma/prisma-category-repository";
import { PrismaPostRepository } from "@/repositories/prisma/prisma-post-repository";
import { PrismaTagRepository } from "@/repositories/prisma/prisma-tag-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { CreatePostUseCase } from "@/use-cases/post/create-post";

export function makeCreatePostUseCase(){
    const postRepository = new PrismaPostRepository()
    const userRepository =  new PrismaUserRepository()
    const categoryRepository =  new PrismaCategoryRepository()
    const tagRepository = new PrismaTagRepository()

    const useCase = new CreatePostUseCase(
        postRepository,
        userRepository,
        categoryRepository,
        tagRepository
    )

    return useCase
}