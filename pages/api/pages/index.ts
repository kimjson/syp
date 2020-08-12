import { NextApiHandler } from "next";
import { getSession } from 'next-auth/client'
import { getRepository } from "typeorm";

import User from '@/entity/user';
import Page from "@/entity/page";
import withConnection from '@/middlewares/withConnection';

const handler: NextApiHandler = withConnection(async (req, res) => {
  if (req.method === 'GET') {
    try {
      const session = await getSession({req})
      if (!session) {
        return res.status(401).json({message: '로그인 정보가 틀립니다'});
      }
      const {email} = session.user;
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({email});
      if (!user) {
        return res.status(401).json({message: '로그인 정보가 틀립니다'});
      }
      return res.json({data: await Page.find({where: {user}})});
    } catch (err) {
      console.error(err);
      return res.status(500).json({message: '알 수 없는 오류가 발생했습니다'});
    }
    
  } else {
    return res.status(405).end();
  }
})

export default handler;