import { InMemoryCategoryRepository } from "@/repositories/in-memory-repository/in-memory-category-repository";
import { InMemoryPostRepository } from "@/repositories/in-memory-repository/in-memory-post-repository";
import { InMemoryTagREpository } from "@/repositories/in-memory-repository/in-memory-tag-repository";
import { InMemoryUserRepository } from "@/repositories/in-memory-repository/in-memory-user-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { EditPostUseCase } from "./edit-post";

let inMemoryPostRepository: InMemoryPostRepository
let inMemoryUserRepository: InMemoryUserRepository
let inMemoryCategoryRepository: InMemoryCategoryRepository
let inMemoryTagRepository: InMemoryTagREpository
let sut: EditPostUseCase

describe('Edit post', () =>{
    beforeEach(() =>{
        inMemoryPostRepository = new InMemoryPostRepository()
        inMemoryUserRepository = new InMemoryUserRepository()
        inMemoryCategoryRepository = new InMemoryCategoryRepository()
        inMemoryTagRepository = new InMemoryTagREpository()
        sut = new EditPostUseCase(
            inMemoryPostRepository
        )
    })

    it('Should be able to edit a post', async() =>{
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
            title: 'edited post',
            content: 'edited content'
        })

        expect(result.isRight()).toBe(true)
        expect(result.value).toEqual({
            post:expect.objectContaining({
                   title: 'edited post',
                   content: 'edited content'
            })
        })
    })

    it('Should not be able to edit a post with postId wrong', async() =>{
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
            title: 'edited post',
            content: 'edited content'
        })

        expect(result.isLeft()).toBe(true)
    })


})
