import { Router} from "express";
import { createController } from "./controllers/create";

const router = Router();

router.post('/', (request, response) => {
    return createController(request,response);
})

export default router;