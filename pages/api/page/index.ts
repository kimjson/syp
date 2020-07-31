import { NextApiRequest, NextApiResponse } from 'next'
import ogs from 'open-graph-scraper';

import Page from '@/entity/page';
import {connect, close} from '@/utils/db';

type Handler = (req: NextApiRequest, res: NextApiResponse) => any;

const post: Handler = async (req, res) => {
  const {url} = req.body;

  try {
    const {result} = await ogs({url});

    if (result.success) {
      const {ogTitle, ogUrl, ogDescription} = result;
      const page = Page.create({title: ogTitle, url: ogUrl, description: ogDescription});
      res.json(await page.save()); 
    } else {
      res.status(400);
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