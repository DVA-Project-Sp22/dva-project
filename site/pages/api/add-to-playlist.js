import { addItemsToPlaylist } from '../../lib/spotify';

export default async function handler(_, res) {
  const response = await addItemsToPlaylist(); // no params for now
  const data = await response.json();
  
  return res.status(200).json(data);
}