import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { link } = req.query as { link: string }
  let missingParam: string | null = null

  if (!link) {
    missingParam = 'link'
  }

  if (missingParam) {
    return res.status(400).json({ error: `Hiányzó paraméter: ${missingParam}` })
  }

  const domain = link.split('/')[2]
  if (
    domain !== 'localhost:3000' &&
    domain !== 'erettsegi.albert.lol' &&
    domain !== 'dload-oktatas.educatio.hu'
  ) {
    return res.status(400).json({ error: 'Érvénytelen link' })
  }

  try {
    const { protocol, host } = new URL(link)
    if (!protocol || !host) {
      return res.status(400).json({ error: 'Érvénytelen link' })
    }

    const response = await fetch(link, { method: 'HEAD' })

    const status = response.status
    res.status(200).json({ status })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error })
  }
}
