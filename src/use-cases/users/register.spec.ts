import { InMemoryUserRepository } from '@/repositories/in-memory-repository/in-memory-user-repository'
import {beforeEach, describe, expect, it} from 'vitest'
import { RegisterUsersUseCase } from './register'

let inMemoryUserRepository: InMemoryUserRepository
let sut: RegisterUsersUseCase

describe('Register user', () =>{
beforeEach(() =>{
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new RegisterUsersUseCase(inMemoryUserRepository)
})

it('Should be able create a user', async() =>{
    const result = await sut.execute({
        name: 'john doe',
        email: 'johndoe@example.com',
        password: '123456'
    })

    expect(result.isRight()).toBe(true)
})

it('Should not be able to register with same email twice', async() =>{
    const email = 'johndoe@example.com'

    await sut.execute({
        name: 'john doe',
        email,
        password: '123456'
    })

    const result = await sut.execute({
        name: 'john doe',
        email,
        password: '123456'
    })

    expect(result.isLeft()).toBe(true)
})
})

