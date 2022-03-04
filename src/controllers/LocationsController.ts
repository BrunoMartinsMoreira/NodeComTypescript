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

  async findOneLocation(req:Request, res:Response){
    const { id } = req.params;

    if(!id){
      return res.status(400).json({
        error: 'invalid location'
      })
    }

    const location = await knex('locations').where('id', id).first();

    if(!location){
      return res.status(400).json({
        error: 'location not found'
      })
    }

    const items = await knex('items')
      .join('location_items', 'items.id', '=', 'location_items.item_id')
      .where('location_items.location_id', id)
      .select('items.title')

    return res.json({
      location,
      items
    });
  }

  async findAllLocations(req:Request, res:Response){
    try{
      const { city, uf, items } = req.query;

      const parsedItems = <any> String(items).split(',').map(item => {
        Number(item.trim());
      });
  
      const locations = await knex('locations')
        .join('location_items', 'locations.id', '=', 'location_items.location_id')
        .whereIn('location_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('locations.*')
  
      return res.json(locations);
    }catch(err){
      return res.status(400).json({
        error: 'Informe parâmetros válidos'
      })
    }
   
  }
}

export {LocationsController};