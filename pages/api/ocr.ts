// Install: npm install tesseract.js formidable
import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm } from 'formidable'
import fs from 'fs'
import { recognize } from 'tesseract.js'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new IncomingForm()
  form.uploadDir = './tmp'
  form.keepExtensions = true

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Upload error' })

    const filePath = (files.file as any)?.filepath

    const result = await recognize(filePath, 'eng', {
      logger: m => console.log(m), // progress logger
    })

    fs.unlinkSync(filePath) // cleanup
    res.status(200).json({ text: result.data.text })
  })
}
