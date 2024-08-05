import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('create tag (E2E)',() =>{
    beforeAll(async() =>{
        await app.ready()
    })

    afterAll(async() =>{
        await app.close()
    })

    it('Should be able to create a tag', async () =>{

        const {token} = await createAndAuthenticateUser(app, true)

        const response = await request(app.server)
        .post('/tag')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'tag example',
        })
    
        expect(response.statusCode).toEqual(201)
    })
})