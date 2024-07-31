import { PrismaPostRepository } from "@/repositories/prisma/prisma-post-repository";
import { EditPostUseCase } from "@/use-cases/post/edit-post";

export function makeEditPostUseCase(){
    const postRepository = new PrismaPostRepository()
    const useCase = new EditPostUseCase(postRepository)

    return useCase
}