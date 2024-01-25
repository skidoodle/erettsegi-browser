import type { NextApiRequest, NextApiResponse } from 'next'
import { subjects } from '@/utils/subjects'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { vizsgatargy, ev, idoszak, szint } = req.query as {
      vizsgatargy: string
      ev: string
      idoszak: string
      szint: string
    }

    const secure = req.headers['x-forwarded-proto'] === 'https'
    const protocol = secure ? 'https' : 'http'
    const address = req.headers.host

    const baseUrl = `https://dload-oktatas.educatio.hu/erettsegi/feladatok_${ev}${idoszak}_${szint}/`
    const proxiedUrl = `${protocol}://${address}/api/proxy?link=${encodeURI(
      baseUrl
    )}`

    const missingParams = []
    if (!ev) missingParams.push('ev')
    if (!szint) missingParams.push('szint')
    if (!idoszak) missingParams.push('idoszak')
    if (!vizsgatargy) missingParams.push('vizsgatargy')

    if (missingParams.length > 0) {
      return res
        .status(400)
        .json({ error: `Hiányzó paraméterek: ${missingParams.join(', ')}` })
    }

    if (ev <= '2012') {
      return res.status(400).json({ error: 'Érvénytelen év' })
    }

    const validSubjects = subjects.map((subject) => subject.value)
    if (!vizsgatargy || !validSubjects.includes(vizsgatargy)) {
      return res.status(400).json({ error: 'Érvénytelen vizsgatárgy' })
    }

    let honap: string
    switch (idoszak) {
      case 'osz':
        honap = 'okt'
        break
      case 'tavasz':
        honap = 'maj'
        break
      default:
        return res.status(400).json({ error: 'Érvénytelen időszak' })
    }

    let prefix: string
    switch (szint) {
      case 'emelt':
        prefix = `e_${vizsgatargy}`
        break
      case 'kozep':
        prefix = `k_${vizsgatargy}`
        break
      default:
        return res.status(400).json({ error: 'Érvénytelen szint' })
    }

    const feladat = 'fl'
    const utmutato = 'ut'
    const forras = 'for'
    const megoldas = 'meg'
    const shortev = ev.slice(-2)

    let flPdfUrl, utPdfUrl, flZipUrl, utZipUrl
    switch (vizsgatargy) {
      case 'inf':
      case 'infoism':
      case 'digkult':
        flZipUrl = `${baseUrl}${prefix}${forras}_${shortev}${honap}_${feladat}.zip`
        flPdfUrl = `${proxiedUrl}${prefix}_${shortev}${honap}_${feladat}.pdf`
        utZipUrl = `${baseUrl}${prefix}${megoldas}_${shortev}${honap}_${utmutato}.zip`
        utPdfUrl = `${proxiedUrl}${prefix}_${shortev}${honap}_${utmutato}.pdf`
        break
      default:
        flPdfUrl = `${proxiedUrl}${prefix}_${shortev}${honap}_${feladat}.pdf`
        utPdfUrl = `${proxiedUrl}${prefix}_${shortev}${honap}_${utmutato}.pdf`
        break
    }

    res.setHeader('Cache-Control', 's-maxage=31536000')
    res.status(200).json({ flPdfUrl, utPdfUrl, flZipUrl, utZipUrl })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error })
  }
}
