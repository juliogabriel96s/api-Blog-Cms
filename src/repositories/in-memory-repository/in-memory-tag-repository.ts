import { Prisma, Tag } from "@prisma/client";
import { TagRepository } from "../tag-repository";

export class InMemoryTagREpository implements TagRepository{
    
  
     public Items: Tag[] = []
     public currentId = 1

    async create(data: Prisma.TagCreateInput) {
        const tag = {
            id: this.currentId,
            name: data.name
        } 

        this.Items.push(tag)

        this.currentId += 1

        return tag
    }
    
    async findByName(name: string){
        const tag = this.Items.find(item => item.name === name)

        if(!tag){
            return null
        }

        return tag
    }

   async findById(id: number) {
        const tag = this.Items.find(item => item.id === id)

        if(!tag){
            return null
        }

        return tag
    }

    async save(tag: Tag){
        const itemIndex = this.Items.findIndex(item => item.id === tag.id)

        this.Items[itemIndex] = tag

        return tag
    }
    async delete(tag: Tag) {
        const itemIndex =  this.Items.findIndex(item => item.id === tag.id)

        if(itemIndex > -1){
            this.Items.splice(itemIndex, 1)
        }
    }
  

}