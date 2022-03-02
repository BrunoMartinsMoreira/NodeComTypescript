import { connection as knex } from "../database/connection";
import {Request, Response} from 'express';

class ItemsController{
  async index(req:Request, res:Response){
    const items = await knex('items').select('*');
    return res.json(items)
  }
}

export {ItemsController}