import { NextApiRequest, NextApiResponse } from 'next'
import got from 'got';

import Page from '@/entity/page';
import {connect, close} from '@/utils/db';
import metascraper, {Meta} from '@/utils/metascraper';

type Handler = (req: NextApiRequest, res: NextApiResponse) => any;

const post: Handler = async (req, res) => {
  const {url} = req.body;

  try {
    const response = await got(url);
    const meta: Meta = await metascraper({html: response.body, url: response.url})
    const page = Page.create(meta);
    res.json(await page.save()); 
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