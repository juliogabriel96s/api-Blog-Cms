import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUsersUseCase } from "@/use-cases/users/register";

export function makeRegisterUserUseCase(){
    const userRepository = new PrismaUserRepository()
    const useCase = new RegisterUsersUseCase(userRepository)

    return useCase
}