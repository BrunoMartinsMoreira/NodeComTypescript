import {Request, Response, NextFunction} from 'express';
import {verify} from 'jsonwebtoken';

function isUserAuthenticated(req: Request, res: Response, next:NextFunction){
  const authtoken = req.headers.authorization;

  if(!authtoken){
    return res.status(401).end();
  }

  const [, token] = authtoken.split(" ");

  try{
    const decodedToken = verify(token, process.env.SIGNATURE_TOKEN);
    return next();
  }catch(err){
    return res.status(401).end();
  }
}

export {isUserAuthenticated};