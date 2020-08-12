import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import {connect, close} from '@/utils/db';

export default function withConnection(handler: NextApiHandler) {
  return async function handlerWithConnection(req: NextApiRequest, res: NextApiResponse) {
    const conn = await connect();
    await handler(req, res);
    close(conn);
  }
}