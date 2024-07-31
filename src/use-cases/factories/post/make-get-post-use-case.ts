import { PrismaPostRepository } from "@/repositories/prisma/prisma-post-repository";
import { GetPostUseCase } from "@/use-cases/post/get-post";

export function makeGetPostUseCase(){
    const postRepository = new PrismaPostRepository()
    const useCase = new GetPostUseCase(postRepository)

    return useCase
}