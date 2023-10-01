import url from 'url'
import axios from 'axios'

export async function POST(req, res) {
  try {
    const envelope = req.body
    const pieces = envelope.split('\n')

    const header = JSON.parse(pieces[0])
    const { host, path } = url.parse(header.dsn)
    const projectId = path.endsWith('/') ? path.slice(0, -1) : path
    const _url = `https://${host}/api/${projectId}/envelope/`

    const response = await axios.post(_url, req.body)

    res.status(response.status).end(response.statusText)
  } catch (e) {
    console.log(e)
    return res.status(400).json({ status: 'invalid request' })
  }
}
