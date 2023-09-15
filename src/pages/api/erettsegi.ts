import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { ev, szint, vizsgatargy, evszak, tipus } = req.query
    const baseUrl = 'https://dload-oktatas.educatio.hu/erettsegi/feladatok_'

    const vizsgatargyak = {
        k_magyir: 'e_magyir',
        k_mat: 'e_mat',
        k_tort: 'e_tort',
        k_angol: 'e_angol',
        k_nemet: 'e_nemet',
        k_inf: 'e_inf',
        k_infoism: 'e_infoism',
    }

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

    let pdfUrl
    if (tipus === 'fl' || tipus === 'ut') {
        pdfUrl = `${baseUrl}${ev}${evszak}_${szint}/${prefix}_${ev!.slice(
            -2
        )}${honap}_${tipus}.pdf`
    } else {
        return res.status(400).json({ error: 'Érvénytelen típus' })
    }

    res.status(200).json({ pdfUrl })
}
