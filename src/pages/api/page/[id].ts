import { NextApiHandler } from 'next'
import {getSession} from 'next-auth/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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