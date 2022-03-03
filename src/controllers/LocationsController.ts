import { connection as knex } from "../database/connection";
import {Request, Response} from 'express';

class LocationsController{
  async create(req:Request, res:Response){
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items // vem um array de ids
    }: any = req.body;

    const location: object = {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const transaction = await knex.transaction();

    const newId: Array<number> = await transaction('locations').insert(location);//retorna um [] com o id da inserção
    const location_id:number = newId[0];

    const locationItems = items.map((item_id: number) => {
      return {
        item_id,
        location_id
      }
    })

    await transaction('location_items').insert(locationItems);

    await transaction.commit();

    return res.json({
      id: location_id,
      ...location
    });
  }
}

export {LocationsController};