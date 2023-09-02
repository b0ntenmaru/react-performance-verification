// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  page: number
  numbers: number[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const page = req.query.page //クエリパラメータの取得

  const queryParamPage = Number(page)

  let result: number[] = [];
  if (queryParamPage < 5) {
    //0～99を返す
    // @ts-ignore
    result = [...Array(100).keys()].map(i => i + queryParamPage * 100)
  }

  const response = {
    page: queryParamPage,
    numbers: result
  }

  //処理成功
  res.statusCode = 200
  res.json(response)
}
