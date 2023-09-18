import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ev, szint, vizsgatargy, idoszak } = req.query
  const baseUrl = 'https://dload-oktatas.educatio.hu/erettsegi/feladatok_'

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

  if (ev! <= '2005') {
    return res.status(400).json({ error: 'Érvénytelen év' })
  }

  switch (vizsgatargy) {
    case 'magyir':
    case 'mat':
    case 'tort':
    case 'angol':
    case 'nemet':
    case 'inf':
    case 'infoism':
      break
    default:
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

  let flPdfUrl, utPdfUrl, flZipUrl, utZipUrl, ZipUrl
  switch (vizsgatargy) {
    case 'inf':
    case 'infoism':
      switch (ZipUrl) {
        case ZipUrl:
          flZipUrl = `${baseUrl}${ev}${idoszak}_${szint}/${prefix}${forras}_${shortev}${honap}_${feladat}.zip`
          flPdfUrl = `${baseUrl}${ev}${idoszak}_${szint}/${prefix}_${shortev}${honap}_${utmutato}.pdf`
          utZipUrl = `${baseUrl}${ev}${idoszak}_${szint}/${prefix}${megoldas}_${shortev}${honap}_${utmutato}.zip`
          utPdfUrl = `${baseUrl}${ev}${idoszak}_${szint}/${prefix}_${shortev}${honap}_${utmutato}.pdf`
          break
        default:
          return res.status(400).json({ error: 'Érvénytelen fájl' })
      }
      break
    default:
      flPdfUrl = `${baseUrl}${ev}${idoszak}_${szint}/${prefix}_${shortev}${honap}_${feladat}.pdf`
      utPdfUrl = `${baseUrl}${ev}${idoszak}_${szint}/${prefix}_${shortev}${honap}_${utmutato}.pdf`
      break
  }

  res.status(200).json({ flPdfUrl, utPdfUrl, flZipUrl, utZipUrl })
}
