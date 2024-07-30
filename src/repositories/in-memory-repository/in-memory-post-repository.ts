import { Post, Prisma } from "@prisma/client";
import { PostRepository } from "../post-repository";

export class InMemoryPostRepository implements PostRepository{

    public Items: Post[] = []

    public currentId = 1

    async create(data: Prisma.PostUncheckedCreateInput) {
        const post = {
            id: this.currentId,
            title: data.title,
            content: data.content,
            published: data.published ? data.published : false ,
            userId: data.userId,
            categoryId: data.categoryId ?? null,
            tagId: data.tagId ?? null,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.Items.push(post)

        return post


    }
    async findById(id: number) {
        const post = this.Items.find(item => item.id === id)

        if(!post){
            return null
        }

        return post
    }
    async save(post: Post){
        const itemIndex = this.Items.findIndex(item => item.id === post.id)

        this.Items[itemIndex] = post

        return post
    }
   async delete(post: Post){
        const itemIndex = this.Items.findIndex(item => item.id === post.id)

        if(itemIndex > -1){
            this.Items.splice(itemIndex, 1)
        }
    }

}