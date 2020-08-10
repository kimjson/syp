import "reflect-metadata";
import {createConnection, Connection, getConnectionOptions} from 'typeorm';
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import Page from '@/entity/page';
import User from '@/entity/user';

export async function connect() {
  const options = await getConnectionOptions();
  return createConnection({
    ...options,
    entities: [Page, User]
  });
}

export function close(conn: Connection) {
  conn.close();
}


export function withConnection(handler: NextApiHandler) {
  return async function handlerWithConnection(req: NextApiRequest, res: NextApiResponse) {
    const conn = await connect();
    await handler(req, res);
    close(conn);
  }
}