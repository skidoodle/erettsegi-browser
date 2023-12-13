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
    const response = await fetch(link, { method: 'GET' })

    if (response.headers.get('content-type') !== 'application/pdf') {
      return res.status(400).json({ error: 'Érvénytelen link' })
    }

    if (response.ok) {
      res.setHeader('Content-Type', 'application/pdf')
      const arrayBuffer: ArrayBuffer = await response.arrayBuffer()
      const pdfBuffer: Buffer = Buffer.from(arrayBuffer)
      res.send(pdfBuffer)
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
