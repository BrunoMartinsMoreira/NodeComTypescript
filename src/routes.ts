import { Router } from "express";
import { ItemsController } from "./controllers/ItemsController";
import { LocationsController } from "./controllers/LocationsController";
import { UsersController } from "./controllers/UsersController";
import { SessionsController } from "./controllers/SessionsController";
import { isUserAuthenticated } from "./middlewares/isUserAuthenticated";

const router = Router();

const itemsController = new ItemsController();
const locationsController = new LocationsController();
const usersController = new UsersController();
const sessionsController = new SessionsController();

router.get('/items', isUserAuthenticated, itemsController.list);
router.post('/locations', isUserAuthenticated, locationsController.create);
router.get('/:id', isUserAuthenticated, locationsController.findOneLocation);
router.get('/locations', isUserAuthenticated, locationsController.findAllLocations);
router.post('/users', usersController.create);
router.get('/users',isUserAuthenticated, usersController.listUsers);
router.post('/user/login', sessionsController.login);

export {router}