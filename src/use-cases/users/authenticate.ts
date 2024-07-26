import { Either, left, right } from "@/core/either"
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { UserRepository } from "@/repositories/user-repository"
import { User } from "@prisma/client"
import { compare } from "bcryptjs"

interface AuthenticateUserUseCaseRequest{
    email: string
    password: string
}

type AuthenticateUserUseCaseResponse = Either<
ResourceNotFoundError | NotAllowedError,
{
    user: User
}
>

export class AuthenticateUserUseCase{
    constructor(private userRepository: UserRepository){}

    async execute({
        email,
        password
    }: AuthenticateUserUseCaseRequest):Promise<AuthenticateUserUseCaseResponse>{
        const user = await this.userRepository.findByEmail(email)

        if(!user){
            return left(new ResourceNotFoundError())
        }

        const comparePassword = await compare(password, user.password_hash)

        if(!comparePassword){
            return left(new NotAllowedError())
        }

        return right({
            user
        })
    }
}