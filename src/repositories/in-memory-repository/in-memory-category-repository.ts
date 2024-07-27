import { Category, Prisma } from "@prisma/client";
import { CategoryRepository } from "../category-repository";

export class InMemoryCategoryRepository implements CategoryRepository{
  
   
    public Items: Category[] = []

    public currentId = 1

    async create(data: Prisma.CategoryCreateInput) {
        const category = {
            id: this.currentId,
            name: data.name
        }

        this.Items.push(category)

        this.currentId += 1

        return category
    }
    async findByName(name: string){
        const category = this.Items.find(item => item.name === name)

        if(!category){
            return null
        }

        return category
    }
    async findById(id: number) {
        const category = this.Items.find(item => item.id === id)

        if(!category){
            return null
        }

        return category
    }
}