import express, { Request, Response } from "express";
import cors from 'cors';

const routes = (app: any) => {
    //Teste de rota base
    app.route("/").get((req: Request, res: Response) => {
      res.status(200).send({ title: "Home page Test Json" });
    });
  
    //A baixo as rotas
    app
    .use(cors())
    .use(express.json())
    
  };
  
  export default routes;