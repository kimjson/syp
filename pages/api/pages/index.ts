import { NextApiHandler } from "next";
import { getSession } from 'next-auth/client'
import Adapters from 'next-auth/adapters';

import {connect, close} from '@/utils/db';

const models = Adapters.TypeORM.Models;

const handler: NextApiHandler = async (req, res) => {
  const conn = await connect();
  if (req.method === 'GET') {
    const session = await getSession({req})
    if (session) {
      const userRepository = conn.getRepository(Adapters.TypeORM.Models.User.model);
      const user = userRepository.findOne({email: session.email});
    } else {
      res.status(401);
    }
  } else {
    res.status(405);
  }
  close(conn);
}