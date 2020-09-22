import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'

import User, {UserSchema} from '@src/entity/user';

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    }),
  ],

  adapter: Adapters.TypeORM.Adapter(
    process.env.DATABASE_URL,
    {customModels: {User: {model: User, schema: UserSchema}}}
  )
}

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options)
