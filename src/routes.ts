import { Router } from "express";
import { ItemsController } from "./controllers/ItemsController";
import { LocationsController } from "./controllers/LocationsController";
import { UsersController } from "./controllers/UsersController";

const router = Router();

const itemsController = new ItemsController();
const locationsController = new LocationsController();
const usersController = new UsersController();

router.get('/items', itemsController.list);
router.post('/locations', locationsController.create);
router.get('/:id', locationsController.findOneLocation);
router.get('/locations',locationsController.findAllLocations);
router.post('/users', usersController.create);
router.get('/users', usersController.listUsers);

export {router}