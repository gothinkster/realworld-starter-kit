import express, { Request, Response } from "express";
import cors from 'cors';
import userRouter from "../modules/user/routes";

const routes = (app: any) => {

    app.route("/").get((req: Request, res: Response) => {
      res.status(200).send({ title: "Home page Test Json" });
    });
  
    app
    .use(cors())
    .use(express.json())
    .use('api/users', userRouter)
    
  };
  
  export default routes;