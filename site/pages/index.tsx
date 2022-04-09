import type { NextPage } from 'next'
import { Fragment, useEffect, useState } from 'react'
import Head from 'next/head'
import SongCard from '../components/SongCard';
import { ArrowNarrowRightIcon, ChevronUpIcon, ExclamationIcon  } from '@heroicons/react/solid';
import { AnimatePresence, motion } from 'framer-motion';

const Home: NextPage = () => {
  const [songs, setSongs] = useState<any[]>([])
  const [hasGeneratedPlaylist, setHasGeneratedPlaylist] = useState<Boolean>();
  
  const [dislikedSongs, setDislikedSongs] = useState<any[]>([]);
  const [playlistSongs, setPlaylistSongs] = useState<any[]>([]);

  useEffect(() => {
    const getInitialData = async () => {
      const response = await fetch('/api/get-songs');
      const { songs } = await response.json();
      setSongs(songs);
    };

    getInitialData();
  }, []);

  const generatePlaylist = async (event: any) => {
    event.preventDefault();

    // post to the api
    const response = await fetch('/api/generate-playlist', {
      method: 'POST',
    });
    if (response) {
      console.log(response);
      alert('items added to playlist');
      setHasGeneratedPlaylist(true);
    }
  };

  const handleToggle = (item: any) => {
    const newArray = dislikedSongs.includes(item) ? dislikedSongs.filter(i => i !== item) : [ ...dislikedSongs, item ];
    setDislikedSongs(newArray);
  };
  
  const hasDislikedSongs = dislikedSongs?.length > 0;
      
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 py-4 text-center">
        <AnimatePresence initial={false} exitBeforeEnter>
          {!hasDislikedSongs && (
            <motion.div className="rounded-md bg-yellow-50 p-4 text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Pro tip</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      In order to generate a playlist, you have to mark at least one song as disliked.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!hasGeneratedPlaylist && (
          <Fragment>
            <div id="songs-wrapper" className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full mb-12">
              {songs.map(function(item, index) {
                return (
                  <SongCard key={item.song_title + index.toString()} title={item.song_title} artist={item.artist_name} onChangeToggle={() => handleToggle(item)} />
                )})}
            </div>
          </Fragment>
        )}

        <AnimatePresence initial={false} exitBeforeEnter>
          {hasDislikedSongs && (
            <motion.div 
              className="flex justify-around items-center fixed bottom-0 w-full h-24 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                <ChevronUpIcon className="mr-2 -ml-0.5 h-4 w-4" aria-hidden="true" />

                All disliked songs ({dislikedSongs.length})
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-gradient-to-r from-red-500 to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                Generate Playlist
                <ArrowNarrowRightIcon className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
              </button>
            </motion.div>
          )}

        </AnimatePresence>

      </main>
    </>
  )
}

export default Home
