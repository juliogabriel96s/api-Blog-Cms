import { InMemoryCategoryRepository } from "@/repositories/in-memory-repository/in-memory-category-repository";
import { GetCategoryUseCase } from "./get-category";
import { beforeEach, describe, expect, it } from "vitest";

let inMemoryCategoryRepository: InMemoryCategoryRepository
let sut: GetCategoryUseCase

describe('Get category', () =>{
    beforeEach(() =>{
        inMemoryCategoryRepository = new InMemoryCategoryRepository()
        sut = new GetCategoryUseCase(inMemoryCategoryRepository)

    })

    it('Should be able to get a category', async() =>{
        await inMemoryCategoryRepository.create({
            name: 'category example'
        })

        const response = await sut.execute({
            categoryId: 1
        })

        expect(response.isRight()).toBe(true)
    })

    it('Should not be able to get a category with id wrong', async() =>{
        await inMemoryCategoryRepository.create({
            name: 'category example'
        })

        const response = await sut.execute({
            categoryId: 3
        })

        expect(response.isLeft()).toBe(true)
    })
})