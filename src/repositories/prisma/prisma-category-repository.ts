import { Prisma } from "@prisma/client";
import { CategoryRepository } from "../category-repository";
import { prisma } from "@/lib/prisma";

export class PrismaCategoryRepository implements CategoryRepository{
    async create(data: Prisma.CategoryCreateInput){
        const category = await prisma.category.create({
            data
        })

        return category
    }
    async findByName(name: string) {
        const category = await prisma.category.findUnique({
            where:{
                name
            }
        })

        return category
    }
    async findById(id: number){
        const category = await prisma.category.findUnique({
            where:{
                id
            }
        })

        return category
    }
   async save(data: { id: number; name: string; }){
        const category = await prisma.category.update({
            where:{
                   id: data.id
            },
            data
        })

        return category
    }
    async delete(data: { id: number; name: string; }){
        const category = await prisma.category.delete({
            where:{
                id: data.id
            }
        })

        return
    }

}