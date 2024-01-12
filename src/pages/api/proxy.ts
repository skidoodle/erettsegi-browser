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
  if (domain !== 'dload-oktatas.educatio.hu') {
    return res.status(400).json({ error: 'Érvénytelen link' })
  }

  try {
    res.setHeader('Cache-Control', 's-maxage=31536000')
    const response = await fetch(link, { method: 'GET' })
    const contentType = response.headers.get('content-type')
    if (contentType == 'application/pdf') {
      res.setHeader('Content-Type', contentType)
    } else {
      const filename = link.split('/').pop() ?? 'download'
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    }

    if (response.ok) {
      const arrayBuffer: ArrayBuffer = await response.arrayBuffer()
      const buffer: Buffer = Buffer.from(arrayBuffer)
      res.send(buffer)
    } else {
      res
        .status(response.status)
        .json({ error: 'Hiba történt a lekérés során.' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
