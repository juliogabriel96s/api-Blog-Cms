import { PrismaTagRepository } from "@/repositories/prisma/prisma-tag-repository";
import { CreateTagUseCase } from "@/use-cases/tag/create-tag";

export function makeCreateTagUseCase(){
    const tagRepository = new PrismaTagRepository()
    const useCase = new CreateTagUseCase(tagRepository)

    return useCase
}