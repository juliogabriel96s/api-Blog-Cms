import { Category, Prisma } from "@prisma/client";

export interface CategoryRepository{
    create(data: Prisma.CategoryCreateInput): Promise<Category>
    findByName(name: string): Promise<Category | null>
    findById(id: number): Promise<Category | null>
    save(category: Category): Promise<Category>
}