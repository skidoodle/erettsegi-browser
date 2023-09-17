import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ev, szint, vizsgatargy, idoszak, tipus, file } = req.query
  const baseUrl = 'https://dload-oktatas.educatio.hu/erettsegi/feladatok_'

  const missingParams = []
  if (!ev) missingParams.push('ev')
  if (!szint) missingParams.push('szint')
  if (!idoszak) missingParams.push('idoszak')
  if (!vizsgatargy) missingParams.push('vizsgatargy')
  if (!tipus) missingParams.push('tipus')

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

  switch (tipus) {
    case 'fl':
    case 'ut':
      break
    default:
      return res.status(400).json({ error: 'Érvénytelen típus' })
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

  const forras = 'for'
  const megoldas = 'meg'
  const shortev = ev!.slice(-2)

  let pdfUrl, zipUrl
  switch (vizsgatargy) {
    case 'inf':
    case 'infoism':
      switch (file) {
        case 'forras':
          switch (tipus) {
            case 'fl':
              zipUrl = `${baseUrl}${ev}${idoszak}_${szint}/${prefix}${forras}_${shortev}${honap}_${tipus}.zip`
              pdfUrl = `${baseUrl}${ev}${idoszak}_${szint}/${prefix}_${shortev}${honap}_${tipus}.pdf`
              break
            case 'ut':
              zipUrl = `${baseUrl}${ev}${idoszak}_${szint}/${prefix}${forras}_${shortev}${honap}_fl.zip`
              pdfUrl = `${baseUrl}${ev}${idoszak}_${szint}/${prefix}_${shortev}${honap}_${tipus}.pdf`
              break
            default:
              return res.status(400).json({ error: 'Érvénytelen fájl' })
          }
          break
        case 'megoldas':
          switch (tipus) {
            case 'ut':
              zipUrl = `${baseUrl}${ev}${idoszak}_${szint}/${prefix}${megoldas}_${shortev}${honap}_${tipus}.zip`
              pdfUrl = `${baseUrl}${ev}${idoszak}_${szint}/${prefix}_${shortev}${honap}_${tipus}.pdf`
              break
            case 'fl':
              zipUrl = `${baseUrl}${ev}${idoszak}_${szint}/${prefix}${megoldas}_${shortev}${honap}_ut.zip`
              pdfUrl = `${baseUrl}${ev}${idoszak}_${szint}/${prefix}_${shortev}${honap}_${tipus}.pdf`
              break
            default:
              return res.status(400).json({ error: 'Érvénytelen fájl' })
          }
          break
        default:
          return res.status(400).json({ error: 'Érvénytelen fájl' })
      }
      break
    default:
      pdfUrl = `${baseUrl}${ev}${idoszak}_${szint}/${prefix}_${ev!.slice(
        -2
      )}${honap}_${tipus}.pdf`
      break
  }

  res.status(200).json({ pdfUrl, zipUrl })
}
