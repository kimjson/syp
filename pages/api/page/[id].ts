import { NextApiHandler } from 'next'
import {getSession} from 'next-auth/client';

import Page from '@/entity/page';
import withConnection from '@/middlewares/withConnection';
import User from '@/entity/user';
import { getRepository } from 'typeorm';

const patch: NextApiHandler = async (req, res) => {
  try {
    const session = await getSession({req});
    if (!session) {
      return res.status(401).json({message: '로그인 정보가 틀립니다'});
    }
    const user = await getRepository(User).findOne({email: session.user.email});
    const page = await Page.findOne(req.query.id as string, {where: {user}});
    if (!page) {
      return res.status(404).json({message: '링크를 찾을 수 없습니다'});
    }
    return res.json(await Page.update(page.id, req.body));
  } catch (err) {
    console.error({err})
    return res.status(500).end();
  }
}

export default withConnection(async (req, res) => {
  if (req.method === 'PATCH') {
    await patch(req, res);
  } else {
    res.status(405);
  }
})