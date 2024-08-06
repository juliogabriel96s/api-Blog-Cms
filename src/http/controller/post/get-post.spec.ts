import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get post (E2E)',() =>{
    beforeAll(async() =>{
        await app.ready()
    })

    afterAll(async() =>{
        await app.close()
    })

    it('Should be able to get a post', async () =>{

          const user = await prisma.user.create({
            data:{
                name: 'john doe',
                email: 'johndoe@example.com',
                password_hash: await hash('123456', 6)
            }
         })

         const authToken = await request(app.server)
        .post('/sessions')
        .send({
            email: 'johndoe@example.com',
            password: '123456'
        })

        const {token} = authToken.body

        const category = await prisma.category.create({
            data:{
                name: 'category example'
            }
        })

        const tag = await prisma.tag.create({
            data:{
                name: 'tag example'
            }
        })

        const post = await prisma.post.create({
           data:{
           title: 'title example',
	       content: 'content example',
           userId: user.id,
           categoryId: category.id,
           tagId: tag.id
           }
        })
  
        const response = await request(app.server)
        .get(`/post/${post.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send()
    
        expect(response.statusCode).toEqual(200)
    })
})