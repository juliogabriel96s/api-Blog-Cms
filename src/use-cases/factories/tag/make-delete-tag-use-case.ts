import { PrismaTagRepository } from "@/repositories/prisma/prisma-tag-repository";
import { DeleteTagUseCase } from "@/use-cases/tag/delete-tag";

export function makeDeleteTagUseCase(){
    const tagRepository = new PrismaTagRepository()
    const useCase = new DeleteTagUseCase(tagRepository)

    return useCase
}