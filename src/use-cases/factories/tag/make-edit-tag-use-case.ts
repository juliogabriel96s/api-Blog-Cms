import { PrismaTagRepository } from "@/repositories/prisma/prisma-tag-repository";
import { EditTagUseCase } from "@/use-cases/tag/edit-tag";

export function makeEditTagUseCase(){
    const tagRepository = new PrismaTagRepository()
    const useCase = new EditTagUseCase(tagRepository)

    return useCase
}