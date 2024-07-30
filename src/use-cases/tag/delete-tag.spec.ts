import { InMemoryTagREpository } from "@/repositories/in-memory-repository/in-memory-tag-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteTagUseCase } from "./delete-tag";

let inMemoryTagRepository: InMemoryTagREpository
let sut: DeleteTagUseCase

describe('Delete tag', () =>{
    beforeEach(() =>{
        inMemoryTagRepository = new InMemoryTagREpository()
        sut = new DeleteTagUseCase(inMemoryTagRepository)
    })

    it('Should be able to delete a tag', async() =>{
       await inMemoryTagRepository.create({
        name: 'tag example'
       })

       const result = await sut.execute({
        tagId: 1,
       })

       expect(result.isRight()).toBe(true)
    
    })

    it('Should not be able to delete a tag with id wrong', async() =>{
        await inMemoryTagRepository.create({
         name: 'edit tag'
        })
 
        const result = await sut.execute({
         tagId: 3,
        })
 
        expect(result.isLeft()).toBe(true)
     })
})