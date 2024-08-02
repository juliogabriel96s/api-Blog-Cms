import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { makeAuthenticateUserUseCase } from "@/use-cases/factories/user/make-authenticate-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticateUser(request: FastifyRequest, reply: FastifyReply){
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const {email, password} = authenticateBodySchema.parse(request.body)

    const authenticateUserUseCase = makeAuthenticateUserUseCase()

    const result = await authenticateUserUseCase.execute({
        email,
        password
    })

    if(result.isLeft()){
        const error = result.value

        if(error instanceof ResourceNotFoundError){
            return reply.status(404).send({message: 'User not found or invalid credentials'})
        }

        if(error instanceof NotAllowedError){
            return reply.status(404).send({message: 'User not found or invalid credentials'})
        }


        return reply.status(400).send({message: 'An error occured'})
    }

    const {user} = result.value
    
    const token = await reply.jwtSign({},{
        sign:{
            sub: user.id
        }
    })

    return reply.status(200).send({token})
}