import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Edit category (E2E)',() =>{
    beforeAll(async() =>{
        await app.ready()
    })

    afterAll(async() =>{
        await app.close()
    })

    it('Should be able to edit a category', async () =>{

        const {token} = await createAndAuthenticateUser(app, true)

        const category = await prisma.category.create({
            data:{
                name: 'category example'
            }
        })

        const response = await request(app.server)
        .put(`/category/${category.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'edited category'
        })
    
        expect(response.statusCode).toEqual(200)
    })
})