import {Post, Prisma } from "@prisma/client";

export interface PostRepository{
    create(data: Prisma.PostUncheckedCreateInput): Promise<Post>
    findById(id: number): Promise<Post | null>
    save(post: Post): Promise<Post>
    delete(post: Post): Promise<void>
}