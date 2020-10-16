import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Book, PrismaClient } from "@prisma/client";

import withUser from '@src/middlewares/withUser';

type NextApiHandlerWithDefaultBook = (req: NextApiRequest, res: NextApiResponse, defaultBook: Book) => void | Promise<void>

export default (prisma: PrismaClient) => (handler: NextApiHandlerWithDefaultBook): NextApiHandler => withUser(prisma)(async (req, res, user) => {
  const defaultBooks = await user.books({where: {isDefault: true}})
  if (!defaultBooks.length) {
    return res.status(404).json({message: '데이터를 찾을 수 없습니다'});
  }
  // TODO: 디폴트 북은 반드시, 그리고 오직 하나 존재하는데 이 제약을 DB 단에서 걸기
  await handler(req, res, defaultBooks[0]);
})