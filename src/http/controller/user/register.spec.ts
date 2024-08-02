import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register user (E2E)',() =>{
    beforeAll(async() =>{
        await app.ready()
    })

    afterAll(async() =>{
        await app.close()
    })

    it('Should be able to register a user', async () =>{
        const response = await request(app.server)
        .post('/user')
        .send({
            name: 'john doe',
            email: 'johndoe@example.com',
            password: '123456'
        })
    
        expect(response.statusCode).toEqual(201)
    })
})