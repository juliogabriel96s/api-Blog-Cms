import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate user (E2E)',() =>{
    beforeAll(async() =>{
        await app.ready()
    })

    afterAll(async() =>{
        await app.close()
    })

    it('Should be able to authenticate a user', async () =>{

        await request(app.server)
        .post('/user')
        .send({
            name: 'john doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        const response = await request(app.server)
        .post('/sessions')
        .send({
            email: 'johndoe@example.com',
            password: '123456'
        })
    
        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
    })
})