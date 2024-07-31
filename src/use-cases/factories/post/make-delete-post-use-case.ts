import { PrismaPostRepository } from "@/repositories/prisma/prisma-post-repository";
import { DeletePostUseCase } from "@/use-cases/post/delete-post";

export function makeDeletePostUseCase(){
    const postRepository = new PrismaPostRepository()
    const useCase = new DeletePostUseCase(postRepository)

    return useCase
}