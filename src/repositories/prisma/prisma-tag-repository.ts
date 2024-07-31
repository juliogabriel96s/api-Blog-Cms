import { Prisma } from "@prisma/client";
import { TagRepository } from "../tag-repository";
import { prisma } from "@/lib/prisma";

export class PrismaTagRepository implements TagRepository{
    async create(data: Prisma.TagCreateInput) {
        const tag = await prisma.tag.create({
            data
        })

        return tag
    }
    async findByName(name: string) {
        const tag = await prisma.tag.findUnique({
            where:{
                name
            }
        }) 

        return tag
    }
    async findById(id: number){
        const tag = await prisma.tag.findUnique({
            where:{
                id
            }
        }) 

        return tag
    }
    async save(data: { id: number; name: string; }) {
        const tag = await prisma.tag.update({
            where:{
                id: data.id
            },
            data
        })

        return tag
    }
    async delete(data: { id: number; name: string; }){
         await prisma.tag.delete({
            where:{
                id: data.id
            }
        })
  return 

    }

}