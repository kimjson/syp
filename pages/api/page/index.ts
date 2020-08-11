import { NextApiRequest, NextApiResponse } from 'next'
import got from 'got';
import {getSession} from 'next-auth/client';

import Page from '@/entity/page';
import {connect, close} from '@/utils/db';
import metascraper, {Meta} from '@/utils/metascraper';
import User from '@/entity/user';
import { getRepository } from 'typeorm';

type Handler = (req: NextApiRequest, res: NextApiResponse) => any;

const post: Handler = async (req, res) => {
  try {
    const session = await getSession({req});
    if (!session) {
      return res.status(401).json({message: '로그인 정보가 틀립니다'});
    }
    const response = await got(req.body.url);
    const meta: Meta = await metascraper({html: response.body, url: response.url})
    const page = Page.create(meta);
    const user = await getRepository(User).findOne({email: session.user.email});
    if (!user) {
      return res.status(401).json({message: '로그인 정보가 틀립니다'});
    }
    page.user = user;
    return res.json(await page.save()); 
  } catch (err) {
    return res.status(500).end();
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const conn = await connect();
  if (req.method === 'POST') {
    await post(req, res);
  } else {
    res.status(405);
  }
  close(conn);
}