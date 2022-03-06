import { connection as knex } from "../database/connection";
import {Request, Response} from 'express';

interface Iuser{
  name: string,
  email: string,
  password: string
}

class UsersController{
  async create(req:Request, res:Response){
    try{
      const {name, email, password} = req.body;

      const user: Iuser = {name, email, password};

      const userExists = await (await knex('users')).find(email);

      if(userExists){
        return res.status(404).json({
          error: 'User already exists'
        })
      }

      const newId: string = await knex('users').insert(user);

      return res.json({
        id: newId[0],
        ...user
      })
    }catch(err){
      return res.json(err)
    }
    
  }
  
  async listUsers(req:Request, res:Response){
    const users = await knex('users').select('*');
    return res.json(users);
  }
}

export {UsersController}