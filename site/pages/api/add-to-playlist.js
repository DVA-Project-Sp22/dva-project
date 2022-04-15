import { addItemsToPlaylist } from '../../lib/spotify'

export default async function handler(req, res) {
  const { id, uris } = JSON.parse(req.body)
  const response = await addItemsToPlaylist(id, uris)
  const data = await response.json()

  return res.status(200).json(data)
}
