import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('create category (E2E)',() =>{
    beforeAll(async() =>{
        await app.ready()
    })

    afterAll(async() =>{
        await app.close()
    })

    it('Should be able to create a category', async () =>{

        const {token} = await createAndAuthenticateUser(app, true)

        const response = await request(app.server)
        .post('/category')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'category example',
        })
    
        expect(response.statusCode).toEqual(201)
    })
})