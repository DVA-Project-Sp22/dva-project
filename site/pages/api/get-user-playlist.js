import { getCurrentUserPlaylists } from '../../lib/spotify';

export default async (_, res) => {
  //TODO: have to pass in playlist id
  const response = await getCurrentUserPlaylists();
  const data = await response.json();

  return res.status(200).json(data);
};
