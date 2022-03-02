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

    const newId: Array<number> = await knex('locations').insert(location);//retorna um [] com o id da inserção
    const locationId:number = newId[0];

    const locationItems = items.map((item_id: number) => {
      return {
        item_id,
        location_id: locationId
      }
    })

    await knex('location_items').insert(locationItems)

    return res.json({
      id: locationId,
      ...location
    });
  }
}

export {LocationsController};