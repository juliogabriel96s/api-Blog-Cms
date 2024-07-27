import { InMemoryCategoryRepository } from "@/repositories/in-memory-repository/in-memory-category-repository";
import { EditCategoryUseCase } from "./edit-category";
import { beforeEach, describe, expect, it } from "vitest";

let inMemoryCategoryRepository: InMemoryCategoryRepository
let sut: EditCategoryUseCase

describe('Edit category', () =>{
    beforeEach(() =>{
        inMemoryCategoryRepository = new InMemoryCategoryRepository()
        sut = new EditCategoryUseCase(inMemoryCategoryRepository)
    })

    it('Should be able to edit a category', async() =>{
        await inMemoryCategoryRepository.create({
            name: 'category teste'
        })

        const result = await sut.execute({
            categoryId: 1,
            name: 'edit category'
        })

        expect(result.isRight()).toBe(true)
        expect(result.value).toEqual({
            category:expect.objectContaining({
                 name: 'edit category'
            })
        })
    })

    it('Should be able to edit a category', async() =>{
        await inMemoryCategoryRepository.create({
            name: 'category teste'
        })

        const result = await sut.execute({
            categoryId: 3,
            name: 'edit category'
        })

        expect(result.isLeft()).toBe(true)
        
    })
})