import { InMemoryCategoryRepository } from "@/repositories/in-memory-repository/in-memory-category-repository";
import { CreateCategoryUseCase } from "./create-category";
import { beforeEach, describe, expect, it } from "vitest";

let inMemoryCategoryRepository: InMemoryCategoryRepository
let sut: CreateCategoryUseCase

describe('Create category', () =>{
    beforeEach(() =>{
        inMemoryCategoryRepository = new InMemoryCategoryRepository()
        sut = new CreateCategoryUseCase(inMemoryCategoryRepository)
    })

    it('Should be able to create a category', async () =>{
        const response = await sut.execute({
            name: 'category example'
        })

        expect(response.isRight()).toBe(true)
    })


    it('Should be able to create a category', async () =>{
        const name = 'category example'

        await sut.execute({
            name
        })

        const response = await sut.execute({
            name
        })

        expect(response.isLeft()).toBe(true)
    })
})