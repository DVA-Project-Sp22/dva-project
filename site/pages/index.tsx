import { Fragment, useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import SongCard from '../components/SongCard'
import { ExclamationIcon } from '@heroicons/react/solid'
import { AnimatePresence, motion } from 'framer-motion'
import BottomBar from '../components/BottomBar'
import Select from '../components/Select'
import Chart from '../components/Chart'
import ContactForm from '../components/ContactForm'
import BarChart from '../components/BarChart'
import RadarChart from '../components/RadarChart'
import { InferGetServerSidePropsType } from 'next'

function Home({
  songs,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [hasGeneratedPlaylist, setHasGeneratedPlaylist] =
    useState<Boolean>(false)

  const [dislikedSongs, setDislikedSongs] = useState<any[]>([])
  const [playlistSongs, setPlaylistSongs] = useState<any[]>([])
  const [spotifyPlaylistId, setSpotifyPlaylistId] = useState<string>()

  const [selectedChartSong, setSelectedChartSong] = useState()

  const handleClick = useCallback(
    (selected) => setSelectedChartSong(selected),
    []
  )

  useEffect(() => {
    setSelectedChartSong(songs[0])
  }, [])

  const generatePlaylist = async (event: any) => {
    event.preventDefault()
    setIsLoading(true)

    const myHeaders = new Headers();
    myHeaders.append('Access-Control-Allow-Origin','*');

    // post to the api - this gives us our songs to add
    const response = await fetch('https://xl22m4quvvtnitrymnl6fa2slu0ssrjr.lambda-url.us-east-1.on.aws/', {
      method: 'POST',
      body: JSON.stringify({
        dislikedSongs: dislikedSongs.map(s => s.track_id),
      }),
      headers: myHeaders,
    })

    if (response) {
      const data = await response.json()

      setSelectedChartSong(data.songs[0])

      // now create spotify playlist from the songs
      const spotifyResponse = await fetch('/api/add-playlist')
      const playlistData = await spotifyResponse.json()

      if (playlistData) {
        const addItemsResponse = await fetch('/api/add-to-playlist', {
          body: JSON.stringify({
            id: playlistData.id,
            uris: data.songs
              .filter((s: { spotify_id: string }) => s.spotify_id !== '')
              .map((song: { spotify_id: any }) => song.spotify_id),
          }),
          method: 'POST',
        })
        const x = await addItemsResponse.json()
        setPlaylistSongs(data.songs)
        setSpotifyPlaylistId(playlistData.external_urls?.spotify)
      }

      setIsLoading(false)
      setHasGeneratedPlaylist(true)
    }
  }

  const handleToggle = (item: any) => {
    const newArray = dislikedSongs.includes(item)
      ? dislikedSongs.filter((i) => i !== item)
      : [...dislikedSongs, item]
    setDislikedSongs(newArray)
  }

  const onRemoveSong = (song: any) => {
    setDislikedSongs(dislikedSongs.filter((s) => s !== song))
  }

  const hasDislikedSongs = dislikedSongs?.length > 0

  return (
    <>
      <Head>
        <title>DiVA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 py-4 text-center">
        {!hasGeneratedPlaylist && (
          <Fragment>
            <AnimatePresence initial={false} exitBeforeEnter>
              {isLoading && (
                <div className="flex justify-center">
                  <span className="circle animate-loader"></span>
                  <span className="circle animation-delay-200 animate-loader"></span>
                  <span className="circle animation-delay-400 animate-loader"></span>
                </div>
              )}
            </AnimatePresence>
            <AnimatePresence initial={false} exitBeforeEnter>
              {!hasDislikedSongs && (
                <motion.div
                  className="p-4 text-left rounded-md bg-yellow-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <ExclamationIcon
                        className="w-5 h-5 text-yellow-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        Pro tip
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          In order to generate a playlist, you have to mark at
                          least one song as disliked.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <Fragment>
              <div
                id="songs-wrapper"
                className="flex flex-wrap items-center justify-around max-w-4xl mt-6 mb-12 sm:w-full"
              >
                {songs.map(function (
                  item: {
                    song_title: any
                    artist_name: any
                    imageUrl: any
                    playUrl: any
                  },
                  index: { toString: () => any }
                ) {
                  return (
                    <SongCard
                      isChecked={dislikedSongs.includes(item)}
                      key={item.song_title + index.toString()}
                      title={item.song_title}
                      artist={item.artist_name}
                      image={item.imageUrl}
                      playUrl={item.playUrl}
                      onChangeToggle={() => handleToggle(item)}
                    />
                  )
                })}
              </div>
            </Fragment>
            <AnimatePresence initial={false} exitBeforeEnter>
              {hasDislikedSongs && (
                <motion.div
                  className="fixed bottom-0 flex items-center justify-around w-full bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <BottomBar
                    dislikedSongs={dislikedSongs}
                    onRemoveSong={onRemoveSong}
                    onGeneratePlaylist={generatePlaylist}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Fragment>
        )}
        {hasGeneratedPlaylist && (
          <div className="w-6/12 text-left">
            <h3 className="mb-4 text-2xl font-bold text-gray-700">
              Results Explorer
            </h3>
            <a
              href={spotifyPlaylistId}
              target="_blank"
              className="inline-flex items-center px-4 py-2 mt-2 mb-4 text-base font-medium text-green-500 bg-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              View Playlist
              <img className="w-12 ml-2" src="/spotify.png" />
            </a>
            <Select data={playlistSongs} onChange={handleClick} />
            <div className="mt-2">
              {selectedChartSong && (
                <Chart
                  chosenSong={selectedChartSong}
                  playlistSongs={playlistSongs}
                />
              )}
              <div className="mt-4">
                <h3 className="mb-8 text-xl font-bold text-gray-700">
                  Playlist Comparison
                </h3>
                <RadarChart
                  dislikedSongs={dislikedSongs}
                  playlistSongs={playlistSongs}
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center mb-8">
                <h3 className="text-xl font-bold text-gray-700">
                  Attribute Explorer
                </h3>
                <span className="text-sm text-gray-300">
                  (of songs in generated playlist)
                </span>
              </div>
              <BarChart playlistSongs={playlistSongs} />
            </div>
            <div className="mt-8">
              <h3 className="mb-4 text-2xl font-bold text-gray-700">
                How'd it go? Any feedback?
              </h3>

              <ContactForm />
            </div>
          </div>
        )}
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const isDevEnv = process.env.NODE_ENV !== 'production'
  const server = isDevEnv
    ? 'http://localhost:3000'
    : 'https://diva-music.netlify.app/'

  // Fetch data from external API
  const response = await fetch(`${server}/api/get-songs`)
  const { songs } = await response.json()
  const filtered = songs.filter(
    (s: { spotify_id: string }) => s.spotify_id !== ''
  )

  const filteredIds = filtered
    .map((s: { spotify_id: string }) => s.spotify_id.split(':')[2])
    .join(',')

  // go get album art/link the records
  const spotifyResponse = await fetch(
    `${server}/api/get-tracks?ids=${filteredIds}`
  )
  const spotData = await spotifyResponse.json()

  console.log(spotData);

  const filteredSongs = filtered.map((s: any, index: number) => {
    return {
      ...s,
      imageUrl: spotData.tracks[index].album.images[0].url,
      playUrl: spotData.tracks[index].external_urls?.spotify || '',
    }
  })
  // Pass data to the page via props
  return { props: { songs: filteredSongs } }
}

export default Home
