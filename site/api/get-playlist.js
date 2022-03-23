import { getPlaylist } from '../../lib/spotify';

export default async (_, res) => {
  //TODO: have to pass in playlist id
  const response = await getPlaylist();
  const { tracks } = await response.json();

  return res.status(200).json({ tracks });
};
