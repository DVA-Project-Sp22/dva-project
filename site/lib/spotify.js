const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
const PLAYLIST_ENDPOINT = 'https://api.spotify.com/v1/playlists/{playlist_id}'
const CREATE_PLAYLIST_ENDPOINT =
  'https://api.spotify.com/v1/users/{user_id}/playlists'
const ADD_ITEMS_TO_PLAYLIST_ENDPOINT =
  'https://api.spotify.com/v1/playlists/{playlist_id}/tracks'
const USER_PLAYLIST_ENDPOINT = 'https://api.spotify.com/v1/me/playlists'
const GET_PLAYLIST_ITEMS_ENDPOINT =
  'https://api.spotify.com/v1/playlists/{playlist_id}/tracks'
const GET_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/tracks'

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  })

  return response.json()
}

export const getPlaylist = async (playlistId) => {
  // may be worth storing this in local storage too
  const { access_token } = await getAccessToken()

  // TODO: REPLACE WITH CREATED PLAYLIST ID
  const formattedEndpoint = PLAYLIST_ENDPOINT.replace(
    '{playlist_id}',
    playlistId
  )
  return fetch(formattedEndpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getCurrentUserPlaylists = async () => {
  // may be worth storing this in local storage too
  const { access_token } = await getAccessToken()
  // TODO: REPLACE WITH CREATED PLAYLIST ID
  return fetch(USER_PLAYLIST_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getTracks = async (tracksQuery) => {
  const { access_token } = await getAccessToken()
  var url = new URL(GET_TRACKS_ENDPOINT)
  url.searchParams.append('ids', tracksQuery)

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const addPlaylist = async () => {
  // may be worth storing this in local storage too
  const { access_token } = await getAccessToken()
  debugger
  const realUserId = '31wmtolxvqyrmcnqyywrmpcnlvrq'
  // TODO: REPLACE WITH REAL USER ID
  const formattedEndpoint = CREATE_PLAYLIST_ENDPOINT.replace(
    '{user_id}',
    realUserId
  )
  return fetch(formattedEndpoint, {
    body: JSON.stringify({
      name: `Playlist created at ${new Date().toLocaleString()}`,
      description: 'This is a test playlist created from Next JS App',
    }),
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    method: 'POST',
  })
}

export const addItemsToPlaylist = async (
  id = '6evF7SQlIzOlz0n2eexo3R',
  uris = []
) => {
  // may be worth storing this in local storage too
  const { access_token } = await getAccessToken()
  // uri form is spotify:track:4iV5W9uYEdYUVa79Axb7Rh, 4iV5W9uYEdYUVa79Axb7Rh
  if (uris.length === 0) {
    uris = [
      'spotify:track:4iV5W9uYEdYUVa79Axb7Rh',
      'spotify:track:1301WleyT98MSxVHPZCA6M',
    ]
  }

  // TODO: REPLACE WITH REAL USER ID
  const formattedEndpoint = ADD_ITEMS_TO_PLAYLIST_ENDPOINT.replace(
    '{playlist_id}',
    id
  )
  return fetch(formattedEndpoint, {
    body: JSON.stringify({
      uris: uris,
    }),
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    method: 'POST',
  })
}

export const getPlaylistItems = async (
  playlistId = '6evF7SQlIzOlz0n2eexo3R'
) => {
  // may be worth storing this in local storage too
  const { access_token } = await getAccessToken()

  // TODO: REPLACE WITH CREATED PLAYLIST ID
  const formattedEndpoint = GET_PLAYLIST_ITEMS_ENDPOINT.replace(
    '{playlist_id}',
    playlistId
  )
  return fetch(formattedEndpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}
