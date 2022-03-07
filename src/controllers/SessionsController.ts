import { connection as knex } from "../database/connection";
import {Request, Response} from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface Iuser{
  email: string,
  password: string
}

class SessionsController {
  async login(req:Request, res:Response){
    const {email, password}: Iuser = req.body;

    const user = await knex('users').where('email', email).first();

    if(!user){
      return res.status(401).json({
        error: 'username or password is invalid.'
      })
    }

    const isPasswordValid = await compare(password, user.password);

    if(!isPasswordValid){
      return res.status(401).json({
        error: 'username or password is invalid.'
      })
    }

    const token = sign(
      {},
      process.env.SIGNATURE_TOKEN,
      {
        subject: String(user.id),
        expiresIn: "1d"
      }
    )

    return res.json({
      token: token
    });
    
  }
}

export {SessionsController};