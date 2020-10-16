import { NextApiRequest, NextApiResponse } from 'next'
import ky from 'ky-universal';
import {PrismaClient} from '@prisma/client';

import metascraper, {Meta} from '@src/utils/metascraper';
import {withDefaultBook} from '@src/middlewares';

const prisma = new PrismaClient();

// TODO: 미들웨어의 결과로 req를 extend 하는 게 좋은지 아니면 추가적인 핸들러 파라미터로 넘겨줄지 재고해보기
// https://nextjs.org/docs/api-routes/api-middlewares#extending-the-reqres-objects-with-typescript
const post = withDefaultBook(prisma)(async (req, res, defaultBook) => {
  try {
    const response = await ky(req.body.url);
    const meta: Meta = await metascraper({html: await response.text(), url: response.url});
    const page = await prisma.page.create({data: {...meta, book: {connect: {id: defaultBook.id}}}})
    return res.json(page);
  } catch (err) {
    console.error({err});
    return res.status(500).end();
  }
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await post(req, res);
  } else {
    res.status(405);
  }
}