import { addPlaylist } from '../../lib/spotify';

export default async function handler(_, res) {
  const response = await addPlaylist(); // no params for now
  const data = await response.json();
  console.log(data);
  
  return res.status(200).json(data);
}