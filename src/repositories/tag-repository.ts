import { Prisma, Tag } from "@prisma/client";

export interface TagRepository{
    create(data: Prisma.TagCreateInput): Promise<Tag>
    findByName(name: string): Promise<Tag | null>
    findById(id: number): Promise<Tag | null>
}