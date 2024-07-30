import { InMemoryCategoryRepository } from "@/repositories/in-memory-repository/in-memory-category-repository";
import { InMemoryPostRepository } from "@/repositories/in-memory-repository/in-memory-post-repository";
import { InMemoryTagREpository } from "@/repositories/in-memory-repository/in-memory-tag-repository";
import { InMemoryUserRepository } from "@/repositories/in-memory-repository/in-memory-user-repository";
import { CreatePostUseCase } from "./create-post";
import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";

let inMemoryPostRepository: InMemoryPostRepository
let inMemoryUserRepository: InMemoryUserRepository
let inMemoryCategoryRepository: InMemoryCategoryRepository
let inMemoryTagRepository: InMemoryTagREpository
let sut: CreatePostUseCase

describe('Create post', () =>{
    beforeEach(() =>{
        inMemoryPostRepository = new InMemoryPostRepository()
        inMemoryUserRepository = new InMemoryUserRepository()
        inMemoryCategoryRepository = new InMemoryCategoryRepository()
        inMemoryTagRepository = new InMemoryTagREpository()
        sut = new CreatePostUseCase(
            inMemoryPostRepository, 
            inMemoryUserRepository,
            inMemoryCategoryRepository,
            inMemoryTagRepository
        )
    })

    it('Should be able to create a post', async() =>{
        const user = await inMemoryUserRepository.create({
            name: 'john doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6)
        })

        const category = await inMemoryCategoryRepository.create({
             name: 'category teste'
        })

        const tag = await inMemoryTagRepository.create({
            name: 'tag example'
        })

        const result = await sut.execute({
            title: 'example title',
            content: 'example content',
            userId: user.id,
            categoryId: category.id,
            tagId: tag.id
        })

        expect(result.isRight()).toBe(true)
    })

    it('Should not be able to create a post with userid wrong', async() =>{
        const user = await inMemoryUserRepository.create({
            name: 'john doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6)
        })

        const category = await inMemoryCategoryRepository.create({
             name: 'category teste'
        })

        const tag = await inMemoryTagRepository.create({
            name: 'tag example'
        })

        const result = await sut.execute({
            title: 'example title',
            content: 'example content',
            userId: 'id-non-existing',
            categoryId: category.id,
            tagId: tag.id
        })

        expect(result.isLeft()).toBe(true)
    })

    it('Should not be able to create a post with categoryId wrong', async() =>{
        const user = await inMemoryUserRepository.create({
            name: 'john doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6)
        })

        const category = await inMemoryCategoryRepository.create({
             name: 'category teste'
        })

        const tag = await inMemoryTagRepository.create({
            name: 'tag example'
        })

        const result = await sut.execute({
            title: 'example title',
            content: 'example content',
            userId: user.id,
            categoryId: 20,
            tagId: tag.id
        })

        expect(result.isLeft()).toBe(true)
    })

    it('Should not be able to create a post with tagId wrong', async() =>{
        const user = await inMemoryUserRepository.create({
            name: 'john doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6)
        })

        const category = await inMemoryCategoryRepository.create({
             name: 'category teste'
        })

        const tag = await inMemoryTagRepository.create({
            name: 'tag example'
        })

        const result = await sut.execute({
            title: 'example title',
            content: 'example content',
            userId: user.id,
            categoryId: category.id,
            tagId: 20
        })

        expect(result.isLeft()).toBe(true)
    })
})
