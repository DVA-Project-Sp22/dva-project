import { getTracks } from '../../lib/spotify'

export default async (req, res) => {
  console.log({ query: req.query })
  const response = await getTracks(req.query.ids)

  const data = await response.json()

  return res.status(200).json(data)
}
