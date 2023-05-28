import { Prisma, User } from "@prisma/client";
import { genSalt, hash } from "bcrypt"
import { createRepository } from "../repositories/create";


const passwordHash = async (password: string) => {
    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)

    return hashedPassword;
}

export const createUseCase = async ({ username, email, password, bio }: Prisma.UserCreateInput): Promise<User> => {
    const hashedPassword = await passwordHash(password);
    
    const user = await createRepository({
        username,
        email,
        password: hashedPassword,
        bio
    })

    return user;
}


