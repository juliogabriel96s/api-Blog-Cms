import { Prisma } from "@prisma/client";
import { PostRepository } from "../post-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPostRepository implements PostRepository{
    async create(data: Prisma.PostUncheckedCreateInput){
        const post = await prisma.post.create({
            data
        })

        return post
    }
    async findById(id: number) {
        const post = await prisma.post.findUnique({
            where:{
                id
            }
        })

        return post
    }
    async save(data: { id: number; title: string; content: string; published: boolean; userId: string; createdAt: Date; updatedAt: Date; categoryId: number | null; tagId: number | null; }) {
        const post = await prisma.post.update({
            where:{
                id: data.id
            },
            data
        })

        return post
    }
    async delete(data: { id: number; title: string; content: string; published: boolean; userId: string; createdAt: Date; updatedAt: Date; categoryId: number | null; tagId: number | null; }) {
        const post = await prisma.post.delete({
            where:{
                id: data.id
            }
            
        })

        return
    }

}