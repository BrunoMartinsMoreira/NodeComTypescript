import { connection as knex } from "../database/connection";
import { Request, Response } from 'express';
import { hash } from 'bcryptjs';

interface Iuser{
  name: string,
  email: string,
  password: string,
}

class UsersController{
  async create(req:Request, res:Response){
    try{
      const {name, email, password}: Iuser = req.body;

      const pwdHash:string = await hash(password, 8);

      const user = {name, email, password: pwdHash};

      const userExists = await knex('users').where('email', email).first();

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
      return res.status(400).json({
        message: 'ocorreu um erro'
      })
    }
    
  }
  
  async listUsers(req:Request, res:Response){
    try {
      const users = await knex('users').select('*');
      return res.json(users);
    } catch (err) {
      return res.status(400).json({
        message: 'ocorreu um erro'
      })
    }
    
  }
}

export {UsersController}