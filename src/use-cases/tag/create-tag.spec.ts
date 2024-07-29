import { InMemoryTagREpository } from "@/repositories/in-memory-repository/in-memory-tag-repository";
import { CreateTagUseCase } from "./create-tag";
import { beforeEach, describe, expect, it } from "vitest";

let inMemoryTagRepository: InMemoryTagREpository
let sut: CreateTagUseCase

describe('Create tag', () =>{
    beforeEach(() =>{
        inMemoryTagRepository = new InMemoryTagREpository()
        sut = new CreateTagUseCase(inMemoryTagRepository)
    })

    it('Should be able create a tag', async() =>{
      const result = await sut.execute({
        name: 'tag example'
    })

    expect(result.isRight()).toBe(true)
})

it('Should not be able create a tag with same name twice', async() =>{

    const name = 'tag example'

    await sut.execute({
        name
    })

    const result = await sut.execute({
      name
  })

  expect(result.isLeft()).toBe(true)
})
})