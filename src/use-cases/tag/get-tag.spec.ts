import { InMemoryTagREpository } from "@/repositories/in-memory-repository/in-memory-tag-repository";
import { GetTagUseCase } from "./get-tag";
import { beforeEach, describe, expect, it } from "vitest";

let inMemoryTagRepository: InMemoryTagREpository
let sut: GetTagUseCase

describe('Get tag', () =>{
    beforeEach(() =>{
        inMemoryTagRepository = new InMemoryTagREpository()
        sut = new GetTagUseCase(inMemoryTagRepository)
    })

    it('Should be able to get a tag', async() =>{
       await inMemoryTagRepository.create({
        name: 'tag example'
       })

       const result = await sut.execute({
        tagId: 1
       })

       expect(result.isRight()).toBe(true)
    })

    it('Should not be able to get a tag with id wrong', async() =>{
        await inMemoryTagRepository.create({
         name: 'tag example'
        })
 
        const result = await sut.execute({
         tagId: 3
        })
 
        expect(result.isLeft()).toBe(true)
     })
})