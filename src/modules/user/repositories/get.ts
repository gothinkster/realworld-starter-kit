import { Prisma } from "@prisma/client"
import prisma from "../../../providers/prisma/client";

export const get = async (id: string) => {
    const createdUser = await prisma.user.findFirst({
        where: {
            id,
        }
    })

    return createdUser;
}

