import { Prisma } from "@prisma/client"
import prisma from "../../../providers/prisma/client";


export const createRepository = async (user: Prisma.UserCreateInput) => {
    const createdUser = await prisma.user.create({
        data: user
    });

    return createdUser;
}

