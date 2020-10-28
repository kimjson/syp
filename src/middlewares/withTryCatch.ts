import { NextApiHandler } from "next";

export default (handler: NextApiHandler): NextApiHandler => async (req, res) => {
  try {
    await handler(req, res);
  } catch (err) {
    res.status(500).json({message: '알 수 없는 오류가 발생했습니다'});
  }
}