import { NextApiHandler } from 'next'
import ky from 'ky-universal';
import {getSession} from 'next-auth/client';

import Page from '@/entity/page';
import metascraper, {Meta} from '@/utils/metascraper';
import withConnection from '@/middlewares/withConnection';
import User from '@/entity/user';
import { getRepository } from 'typeorm';

// https://nextjs.org/docs/api-routes/api-middlewares#extending-the-reqres-objects-with-typescript
const post: NextApiHandler = async (req, res) => {
  try {
    const session = await getSession({req});
    if (!session) {
      return res.status(401).json({message: '로그인 정보가 틀립니다'});
    }
    const response = await ky(req.body.url);
    const meta: Meta = await metascraper({html: await response.text(), url: response.url})
    const page = Page.create(meta);
    const user = await getRepository(User).findOne({email: session.user.email});
    if (!user) {
      return res.status(401).json({message: '로그인 정보가 틀립니다'});
    }
    page.user = user;
    return res.json(await page.save());
  } catch (err) {
    console.warn({err})
    return res.status(500).end();
  }
}

export default withConnection(async (req, res) => {
  if (req.method === 'POST') {
    await post(req, res);
  } else {
    res.status(405);
  }
})