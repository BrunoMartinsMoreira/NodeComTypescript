import { Router } from "express";
import { ItemsController } from "./controllers/ItemsController";
import { LocationsController } from "./controllers/LocationsController";
import { UsersController } from "./controllers/UsersController";
import { SessionsController } from "./controllers/SessionsController";

const router = Router();

const itemsController = new ItemsController();
const locationsController = new LocationsController();
const usersController = new UsersController();
const sessionsController = new SessionsController();

router.get('/items', itemsController.list);
router.post('/locations', locationsController.create);
router.get('/:id', locationsController.findOneLocation);
router.get('/locations',locationsController.findAllLocations);
router.post('/users', usersController.create);
router.get('/users', usersController.listUsers);
router.post('/user/login', sessionsController.login);

export {router}