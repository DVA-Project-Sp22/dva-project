import type { NextPage } from 'next'
import { Fragment, useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import SongCard from '../components/SongCard'
import {
  ArrowNarrowRightIcon,
  ChevronUpIcon,
  ExclamationIcon,
  MailIcon,
} from '@heroicons/react/solid'
import { AnimatePresence, motion } from 'framer-motion'
import BottomBar from '../components/BottomBar'
import Select from '../components/Select'
import Chart from '../components/Chart'
import ContactForm from '../components/ContactForm'
import BarChart from '../components/BarChart'
import { addItemsToPlaylist, addPlaylist } from '../lib/spotify'

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [songs, setSongs] = useState<any[]>([])
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
    const getInitialData = async () => {
      const response = await fetch('/api/get-songs')
      const { songs } = await response.json()
      setSongs(songs)
      setSelectedChartSong(songs[0])
    }

    getInitialData()
  }, [])

  const generatePlaylist = async (event: any) => {
    event.preventDefault()
    setIsLoading(true)

    // post to the api - this gives us our songs to add
    const response = await fetch('/api/generate-playlist', {
      method: 'POST',
    })
    if (response) {
      const data = await response.json()
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
        console.log({ x })
        setPlaylistSongs(data.songs)
        setSpotifyPlaylistId(playlistData.id)
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
        <title>Create Next App</title>
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
                {songs.map(function (item, index) {
                  return (
                    <SongCard
                      isChecked={dislikedSongs.includes(item)}
                      key={item.song_title + index.toString()}
                      title={item.song_title}
                      artist={item.artist_name}
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
            <h3 className="mb-8 text-2xl font-bold text-gray-700">
              Results Explorer
            </h3>
            <Select data={songs} onChange={handleClick} />
            <div className="mt-2">
              {selectedChartSong && (
                <Chart chosenSong={selectedChartSong} playlistSongs={songs} />
              )}
            </div>
            <div className="mt-4">
              <h3 className="mb-8 text-xl font-bold text-gray-700">
                Attribute Explorer
              </h3>
              <BarChart playlistSongs={songs} />
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

export default Home
