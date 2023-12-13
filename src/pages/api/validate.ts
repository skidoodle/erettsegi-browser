import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { link } = req.query as { link: string }
  let MissingParam: string | null = null
  if (!link) {
    MissingParam = 'link'
  }

  if (MissingParam) {
    return res.status(400).json({ error: `Hiányzó paraméter: ${MissingParam}` })
  }

  const secure = req.headers['x-forwarded-proto'] === 'https'
  const protocol = secure ? 'https' : 'http'
  const address = req.headers.host

  if (!link.startsWith(`${protocol}://${address}`)) {
    return res.status(400).json({ error: 'Érvénytelen link' })
  }

  try {
    const response = await fetch(link, { method: 'HEAD' })
    const status = response.status
    res.status(200).json({ status })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
