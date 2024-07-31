import { InMemoryCategoryRepository } from "@/repositories/in-memory-repository/in-memory-category-repository";
import { InMemoryPostRepository } from "@/repositories/in-memory-repository/in-memory-post-repository";
import { InMemoryTagREpository } from "@/repositories/in-memory-repository/in-memory-tag-repository";
import { InMemoryUserRepository } from "@/repositories/in-memory-repository/in-memory-user-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { DeletePostUseCase } from "./delete-post";

let inMemoryPostRepository: InMemoryPostRepository
let inMemoryUserRepository: InMemoryUserRepository
let inMemoryCategoryRepository: InMemoryCategoryRepository
let inMemoryTagRepository: InMemoryTagREpository
let sut: DeletePostUseCase

describe('Delete post', () =>{
    beforeEach(() =>{
        inMemoryPostRepository = new InMemoryPostRepository()
        inMemoryUserRepository = new InMemoryUserRepository()
        inMemoryCategoryRepository = new InMemoryCategoryRepository()
        inMemoryTagRepository = new InMemoryTagREpository()
        sut = new DeletePostUseCase(
            inMemoryPostRepository
        )
    })

    it('Should be able to delete a post', async() =>{
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

        const post = await inMemoryPostRepository.create({
            title: 'example title',
            content: 'example content',
            userId: user.id,
            categoryId: category.id,
            tagId: tag.id
        })

        const result = await sut.execute({
            postId: post.id,
        })

        expect(result.isRight()).toBe(true)
    })

    it('Should not be able to delete a post with postId wrong', async() =>{
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

        const post = await inMemoryPostRepository.create({
            title: 'example title',
            content: 'example content',
            userId: user.id,
            categoryId: category.id,
            tagId: tag.id
        })

        const result = await sut.execute({
            postId: 20,
        })

        expect(result.isLeft()).toBe(true)
    })


})
