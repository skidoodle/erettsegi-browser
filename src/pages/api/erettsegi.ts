import { NextApiRequest, NextApiResponse } from 'next'
import { subjects } from '@/utils/subjects'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { vizsgatargy, ev, idoszak, szint } = req.query
  const baseUrl = `https://dload-oktatas.educatio.hu/erettsegi/feladatok_${ev}${idoszak}_${szint}/`

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

  if (ev! <= '2012') {
    return res.status(400).json({ error: 'Érvénytelen év' })
  }

  const validSubjects = subjects.map((subject) => subject.value)
  if (!vizsgatargy || !validSubjects.includes(vizsgatargy as string)) {
    return res.status(400).json({ error: 'Érvénytelen vizsgatárgy' })
  }

  let honap
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

  let prefix
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
  const shortev = ev!.slice(-2)

  let flPdfUrl, utPdfUrl, flZipUrl, utZipUrl
  switch (vizsgatargy) {
    case 'inf':
    case 'infoism':
    case 'digkult':
      flZipUrl = `${baseUrl}${prefix}${forras}_${shortev}${honap}_${feladat}.zip`
      flPdfUrl = `${baseUrl}${prefix}_${shortev}${honap}_${feladat}.pdf`
      utZipUrl = `${baseUrl}${prefix}${megoldas}_${shortev}${honap}_${utmutato}.zip`
      utPdfUrl = `${baseUrl}${prefix}_${shortev}${honap}_${utmutato}.pdf`
      break
    default:
      flPdfUrl = `${baseUrl}${prefix}_${shortev}${honap}_${feladat}.pdf`
      utPdfUrl = `${baseUrl}${prefix}_${shortev}${honap}_${utmutato}.pdf`
      break
  }

  res.status(200).json({ flPdfUrl, utPdfUrl, flZipUrl, utZipUrl })
}
