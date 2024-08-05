import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('get tag (E2E)',() =>{
    beforeAll(async() =>{
        await app.ready()
    })

    afterAll(async() =>{
        await app.close()
    })

    it('Should be able to get a tag', async () =>{

        const {token} = await createAndAuthenticateUser(app, true)

        const tag = await prisma.tag.create({
            data:{
                name: 'tag example'
            }
        })

        const response = await request(app.server)
        .get(`/tag/${tag.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send()
    
        expect(response.statusCode).toEqual(200)
    })
})