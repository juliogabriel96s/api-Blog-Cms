import { InMemoryTagREpository } from "@/repositories/in-memory-repository/in-memory-tag-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { EditTagUseCase } from "./edit-tag";

let inMemoryTagRepository: InMemoryTagREpository
let sut: EditTagUseCase

describe('Edit tag', () =>{
    beforeEach(() =>{
        inMemoryTagRepository = new InMemoryTagREpository()
        sut = new EditTagUseCase(inMemoryTagRepository)
    })

    it('Should be able to edit a tag', async() =>{
       await inMemoryTagRepository.create({
        name: 'tag example'
       })

       const result = await sut.execute({
        tagId: 1,
        name: 'edit tag'
       })

       expect(result.isRight()).toBe(true)
       expect(result.value).toEqual({
        tag:expect.objectContaining({
             name: 'edit tag'
        })
    })
    })

    it('Should not be able to edit a tag with id wrong', async() =>{
        await inMemoryTagRepository.create({
         name: 'edit tag'
        })
 
        const result = await sut.execute({
         tagId: 3,
         name: 'edit tag'
        })
 
        expect(result.isLeft()).toBe(true)
     })
})