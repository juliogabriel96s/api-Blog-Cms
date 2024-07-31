import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUserUseCase } from "@/use-cases/users/authenticate";

export function makeAuthenticateUserUseCase(){
    const userRepository = new PrismaUserRepository()
    const useCase = new AuthenticateUserUseCase(userRepository)

    return useCase
}