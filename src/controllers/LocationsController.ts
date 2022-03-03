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

    const locationItems = items.map(async (item_id: number) => {
      const itemExits = await transaction('items').where('id', item_id).first();

      if(!itemExits){
        return res.status(400).json({
          message: 'Item not found'
        })
      }
      
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