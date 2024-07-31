import { PrismaTagRepository } from "@/repositories/prisma/prisma-tag-repository";
import { GetTagUseCase } from "@/use-cases/tag/get-tag";

export function makeGetTagUseCase(){
    const tagRepository = new PrismaTagRepository()
    const useCase = new GetTagUseCase(tagRepository)

    return useCase
}