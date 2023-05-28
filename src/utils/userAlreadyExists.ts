import prisma from "../providers/prisma/client";
import HttpError from "./httpError";

export const userAlreadyExists = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (user) {
    throw new HttpError("User already exists", 404) 
  }
};

