import { InMemoryCategoryRepository } from "@/repositories/in-memory-repository/in-memory-category-repository";
import { DeleteCategoryUseCase } from "./delete-category";
import { beforeEach, describe, expect, it } from "vitest";

let inMemoryCategoryRepository: InMemoryCategoryRepository
let sut: DeleteCategoryUseCase

describe('Delete category', () =>{
    beforeEach(() =>{
        inMemoryCategoryRepository = new InMemoryCategoryRepository()
        sut = new DeleteCategoryUseCase(inMemoryCategoryRepository)
    })

    it('Should be able delete a category', async() =>{
        await inMemoryCategoryRepository.create({
            name: 'category example'
        })

        const result = await sut.execute({
            categoryId: 1
        })

        expect(result.isRight()).toBe(true)
    })

    it('Should not be able delete a category with id wrong', async() =>{
        await inMemoryCategoryRepository.create({
            name: 'category example'
        })

        const result = await sut.execute({
            categoryId: 3
        })

        expect(result.isLeft()).toBe(true)
    })
})