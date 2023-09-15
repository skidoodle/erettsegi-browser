import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { ev, szint, vizsgatargy, evszak, tipus, file } = req.query
    const pdfBaseUrl = 'https://dload-oktatas.educatio.hu/erettsegi/feladatok_'
    const zipBaseUrl =
        'https://www.oktatas.hu/bin/content/dload/erettsegi/feladatok_'

    const missingParams = []
    if (!ev) missingParams.push('ev')
    if (!szint) missingParams.push('szint')
    if (!evszak) missingParams.push('evszak')
    if (!vizsgatargy) missingParams.push('vizsgatargy')
    if (!tipus) missingParams.push('tipus')

    if (missingParams.length > 0) {
        return res
            .status(400)
            .json({ error: `Hiányzó paraméterek: ${missingParams.join(', ')}` })
    }

    let honap
    if (evszak === 'osz') {
        honap = 'okt'
    } else if (evszak === 'tavasz') {
        honap = 'maj'
    } else {
        return res.status(400).json({ error: 'Érvénytelen évszak' })
    }

    let prefix
    if (szint === 'emelt') {
        prefix = `e_${vizsgatargy}`
    } else if (szint === 'kozep') {
        prefix = `k_${vizsgatargy}`
    }

    let pdfUrl, zipUrl
    if (vizsgatargy === 'inf' || vizsgatargy === 'infoism') {
        if (file === 'forras' && tipus === 'fl') {
            zipUrl = `${zipBaseUrl}${ev}${evszak}_${szint}/${prefix}for_${ev!.slice(
                -2
            )}${honap}_${tipus}.zip`
        } else if (file === 'megoldas' && tipus === 'ut') {
            zipUrl = `${zipBaseUrl}${ev}${evszak}_${szint}/${prefix}meg_${ev!.slice(
                -2
            )}${honap}_${tipus}.zip`
        } else if (file === 'megoldas' && tipus === 'fl') {
            zipUrl = `${zipBaseUrl}${ev}${evszak}_${szint}/${prefix}meg_${ev!.slice(
                -2
            )}${honap}_ut.zip`
        } else if (file === 'forras' && tipus === 'ut') {
            zipUrl = `${zipBaseUrl}${ev}${evszak}_${szint}/${prefix}for_${ev!.slice(
                -2
            )}${honap}_fl.zip`
        } else {
            return res.status(400).json({ error: 'Érvénytelen fájltípus' })
        }
    } else {
        pdfUrl = `${pdfBaseUrl}${ev}${evszak}_${szint}/${prefix}_${ev!.slice(
            -2
        )}${honap}_${tipus}.pdf`
    }

    res.status(200).json({ pdfUrl, zipUrl })
}
