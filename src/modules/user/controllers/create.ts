import { Request, Response} from "express";
import { createUseCase } from "../useCases/create";


export const createController = (request: Request, response: Response) => {
    const { username, email, password, bio } = request.body;

    const user = createUseCase({
        username,
        email,
        password,
        bio
    })

    return response.status(200).json(user)
}