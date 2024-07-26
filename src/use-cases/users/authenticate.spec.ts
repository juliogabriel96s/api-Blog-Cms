import { InMemoryUserRepository } from '@/repositories/in-memory-repository/in-memory-user-repository'
import {beforeEach, describe, expect, it} from 'vitest'
import { AuthenticateUserUseCase } from './authenticate'
import { hash } from 'bcryptjs'

let inMemoryUserRepository: InMemoryUserRepository
let sut: AuthenticateUserUseCase

describe('Authenticate user', () =>{
beforeEach(() =>{
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new AuthenticateUserUseCase(inMemoryUserRepository)
})

it('Should be able authenticate a user', async() =>{
        await inMemoryUserRepository.create({
            name: 'john doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6)
       }) 

    const result = await sut.execute({
        email: 'johndoe@example.com',
        password: '123456'
    })

    expect(result.isRight()).toBe(true)
})

it('Should not be able authenticate a user with email wrong', async() =>{
    await inMemoryUserRepository.create({
        name: 'john doe',
        email: 'johndoe@example.com',
        password_hash: await hash('123456', 6)
   }) 

const result = await sut.execute({
    email: 'juliogabriel@example.com',
    password: '123456'
})

expect(result.isLeft()).toBe(true)
})

it('Should not be able authenticate a user with password wrong', async() =>{
    await inMemoryUserRepository.create({
        name: 'john doe',
        email: 'johndoe@example.com',
        password_hash: await hash('123456', 6)
   }) 

const result = await sut.execute({
    email: 'johndoe@example.com',
    password: '654321'
})

expect(result.isLeft()).toBe(true)
})

})

