import { Either, left, right } from "@/core/either"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"
import { UserRepository } from "@/repositories/user-repository"
import { User } from "@prisma/client"
import { hash } from "bcryptjs"

interface RegisterUsersUseCaseRequest{
    name: string
    email: string
    password: string
}

type RegisterUsersUseCaseResponse = Either<
NotAllowedError,
{
    user: User
}
>

export class RegisterUsersUseCase{
    constructor(private userRepository: UserRepository){}

    async execute({
        name,
        email,
        password
    }: RegisterUsersUseCaseRequest): Promise<RegisterUsersUseCaseResponse>{
        const password_hash = await hash(password, 6)

        const userWIthSameEmail = await this.userRepository.findByEmail(email)

        if(userWIthSameEmail){
            return left(new NotAllowedError())
        }

        const user = await this.userRepository.create({
            name,
            email, 
            password_hash
        })

        return right({
            user
        })
    }
}