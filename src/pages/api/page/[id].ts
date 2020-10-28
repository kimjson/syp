import { NextApiHandler } from 'next'
import {getSession} from 'next-auth/client';
import { PrismaClient } from '@prisma/client';
import flowRight from 'lodash/flowRight';

import { withTryCatch, withUser } from '@src/middlewares';
import {pipe} from '@src/utils';

const prisma = new PrismaClient();

const patch = flowRight(
  withTryCatch,
  withUser(prisma)
)(async (req, res, user) => {
  const {id: userId} = await user || {};
  const page = await prisma.page.update({where: {id: Number(req.query.id), userId}, data: req.body})
  return res.json(page);
})

const patch = withUser(prisma)(async (req, res, user) => {
  try {

  } catch (err) {
    console.error({err});
    return res.status(500).end();
  }
})

const patch: NextApiHandler = async (req, res) => {
  try {
    const session = await getSession({req});
    if (!session) {
      return res.status(401).json({message: '로그인 정보가 틀립니다'});
    }
    const page = await prisma.page.findOne({where: {userId: user?.id, id: Number(req.query.id)}})
    if (!page) {
      return res.status(404).json({message: '링크를 찾을 수 없습니다'});
    }
    return res.json(await prisma.page.update({where: {id: Number(req.query.id)}, data: req.body}))
  } catch (err) {
    console.error({err})
    return res.status(500).end();
  }
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'PATCH') {
    await patch(req, res);
  } else {
    res.status(405);
  }
}

export default handler;