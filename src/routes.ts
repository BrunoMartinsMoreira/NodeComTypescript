import { Router } from "express";
import { ItemsController } from "./controllers/ItemsController";
import { LocationsController } from "./controllers/LocationsController";

const router = Router();

const itemsController = new ItemsController();
const locationsControler = new LocationsController();

router.get('/items', itemsController.list);
router.post('/locations', locationsControler.create);

export {router}