import { NextApiRequest, NextApiResponse } from 'next'
import got from 'got';
import {getSession} from 'next-auth';

import Page from '@/entity/page';
import {connect, close} from '@/utils/db';
import metascraper, {Meta} from '@/utils/metascraper';
import User from '@/entity/user';
import { getRepository } from 'typeorm';

type Handler = (req: NextApiRequest, res: NextApiResponse) => any;

const post: Handler = async (req, res) => {
  const {url} = req.body;

  try {
    const response = await got(url);
    const meta: Meta = await metascraper({html: response.body, url: response.url})
    const page = Page.create(meta);

    const session = await getSession({req});
    if (session) {
      const user = await getRepository(User).findOneOrFail({email: session.email});
      page.user = user;
      res.json(await page.save()); 
    } else {
      res.status(401);
    }
  } catch (err) {
    console.error(err);
    res.status(500);
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