import "reflect-metadata";
import {createConnection, Connection} from 'typeorm';

export function connect() {
  return createConnection();
}

export function close(conn: Connection) {
  conn.close();
}