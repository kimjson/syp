import { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";

import {withUser} from '@src/middlewares';

const prisma = new PrismaClient();

const get = withUser(prisma)(async (_, res, user) => {
  try {
    // TODO: 요게 유저의 북을 거친 페이지까지 모두 표시해주는지 체크. 아마 아닐 듯?
    return res.json({data: await user.pages()});
  } catch (err) {
    console.error(err);
    return res.status(500).json({message: '알 수 없는 오류가 발생했습니다'});
  }
})

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    await get(req, res);
  } else {
    return res.status(405).end();
  }
}

export default handler;