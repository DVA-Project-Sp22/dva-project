const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const PLAYLIST_ENDPOINT = 'https://api.spotify.com/v1/playlists/{playlist_id}';
const CREATE_PLAYLIST_ENDPOINT = 'https://api.spotify.com/v1/users/{user_id}/playlists';
const ADD_ITEMS_TO_PLAYLIST_ENDPOINT = 'https://api.spotify.com/v1/playlists/{playlist_id}/tracks';

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: URLSearchParams.stringify({
      grant_type: 'refresh_token',
      refresh_token
    })
  });

  return response.json();
};

export const getPlaylist = async (playlistId) => {
  // may be worth storing this in local storage too
  const { access_token } = await getAccessToken();

  // TODO: REPLACE WITH CREATED PLAYLIST ID
  const formattedEndpoint = PLAYLIST_ENDPOINT.replace('{playlist_id}', playlistId);
  return fetch(formattedEndpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

export const createPlaylist = async () => {
  // may be worth storing this in local storage too
  const { access_token } = await getAccessToken();

  const realUserId = 'abcdefghijklmnopqrstuvwxyz';
  // TODO: REPLACE WITH REAL USER ID
  const formattedEndpoint = CREATE_PLAYLIST_ENDPOINT.replace('{user_id}', realUserId);
  return fetch(formattedEndpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`
    },
    method: 'POST',
  });
};

export const AddItemsToPlaylist = async (playlistId, trackUris) => {
  // may be worth storing this in local storage too
  const { access_token } = await getAccessToken();

  // TODO: REPLACE WITH REAL USER ID
  const formattedEndpoint = ADD_ITEMS_TO_PLAYLIST_ENDPOINT.replace('{playlist_id}', playlistId);
  return fetch(formattedEndpoint, {
    body: JSON.stringify({
      uris: trackUris
    }),
    headers: {
      Authorization: `Bearer ${access_token}`
    },
    method: 'POST',
  });
};