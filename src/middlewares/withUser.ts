import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import {getSession} from 'next-auth/client';
import { PrismaClient, User, Prisma__UserClient } from "@prisma/client";

type NextApiHandlerWithUser = (req: NextApiRequest, res: NextApiResponse, user: Prisma__UserClient<User | null>) => void | Promise<void>;

export const withUser = (prisma: PrismaClient) => (handler: NextApiHandlerWithUser): NextApiHandler => async (req, res) => {
  const session = await getSession({req});
  if (!session) {
    return res.status(401).json({message: '로그인 정보가 틀립니다'});
  }
  await handler(req, res, prisma.user.findOne({where: {email: session.user.email}}));
}

export const withUserRequired = (prisma: PrismaClient) => (handler: NextApiHandlerWithRequiredUser): NextApiHandler => async (req, res) => {
  const handlerWithUser = withUser(prisma)(handler);
  try {
    const result = 
  }
}