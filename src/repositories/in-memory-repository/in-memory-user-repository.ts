import { Prisma, $Enums, User } from "@prisma/client";
import { UserRepository } from "../user-repository";
import { randomUUID } from "crypto";

export class InMemoryUserRepository implements UserRepository{
   
    public Items: User[] = []

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: randomUUID() || data.id,
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            role: data.role ? data.role: 'MENBER',
            createdAt: new Date()
        }

        this.Items.push(user)

        return user
    }
    async findByEmail(email: string){
        const user = this.Items.find(item => item.email === email)

        if(!user){
            return null
        }

        return user
    }

    async findById(id: string) {
        const user = this.Items.find(item => item.id === id)

        if(!user){
            return null
        }

        return user
    }

}