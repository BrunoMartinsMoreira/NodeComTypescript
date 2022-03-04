import { Router } from "express";
import { ItemsController } from "./controllers/ItemsController";
import { LocationsController } from "./controllers/LocationsController";

const router = Router();

const itemsController = new ItemsController();
const locationsController = new LocationsController();

router.get('/items', itemsController.list);
router.post('/locations', locationsController.create);
router.get('/:id', locationsController.findOneLocation);
router.get('/location',locationsController.findAllLocations);

export {router}