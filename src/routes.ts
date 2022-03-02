import { Router } from "express";
import { ItemsController } from "./controllers/ItemsController";

const router = Router();

const itemsController = new ItemsController();

router.get('/items', itemsController.index);

export {router}