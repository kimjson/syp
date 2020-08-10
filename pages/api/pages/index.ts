import { NextApiHandler } from "next";
import { getSession } from 'next-auth/client'
import { getRepository } from "typeorm";

import User from '@/entity/user';
import {withConnection} from '@/utils/db';

const handler: NextApiHandler = withConnection(async (req, res) => {
  if (req.method === 'GET') {
    try {
      const session = await getSession({req})
      if (session) {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({email: session.email});
        res.json({data: user?.pages || []});
      } else {
        res.status(401);
      }
    } catch (err) {
      console.error(err);
      res.status(500);
    }
    
  } else {
    res.status(405);
  }
})

export default handler;