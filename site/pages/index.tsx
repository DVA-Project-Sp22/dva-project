import type { NextPage } from 'next'
import { Fragment, useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import SongCard from '../components/SongCard';
import { ArrowNarrowRightIcon, ChevronUpIcon, ExclamationIcon, MailIcon  } from '@heroicons/react/solid';
import { AnimatePresence, motion } from 'framer-motion';
import BottomBar from '../components/BottomBar';
import Select from '../components/Select';
import Chart from '../components/Chart';
import ContactForm from '../components/ContactForm';
import BarChart from '../components/BarChart';

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [songs, setSongs] = useState<any[]>([])
  const [hasGeneratedPlaylist, setHasGeneratedPlaylist] = useState<Boolean>(false);
  
  const [dislikedSongs, setDislikedSongs] = useState<any[]>([]);
  const [playlistSongs, setPlaylistSongs] = useState<any[]>([]);

  const [selectedChartSong, setSelectedChartSong] = useState();

  const handleClick = useCallback(selected => setSelectedChartSong(selected), []);

  useEffect(() => {
    const getInitialData = async () => {
      const response = await fetch('/api/get-songs');
      const { songs } = await response.json();
      setSongs(songs);
      setSelectedChartSong(songs[0])
    };

    getInitialData();
  }, []);

  const generatePlaylist = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    
    // post to the api
    const response = await fetch('/api/generate-playlist', {
      method: 'POST',
    });
    if (response) {
      const data = await response.json();
      console.log(data);
      setIsLoading(false);
      setHasGeneratedPlaylist(true);
    }
  };

  const handleToggle = (item: any) => {
    const newArray = dislikedSongs.includes(item) ? dislikedSongs.filter(i => i !== item) : [ ...dislikedSongs, item ];
    setDislikedSongs(newArray);
  };

  const onRemoveSong = (song: any) => {
    setDislikedSongs(dislikedSongs.filter(s => s !== song));
  };
  
  const hasDislikedSongs = dislikedSongs?.length > 0;
      
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
                  <span className="circle animate-loader animation-delay-200"></span>
                  <span className="circle animate-loader animation-delay-400"></span>
                </div>
            
              )}
            </AnimatePresence>
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
            <Fragment>
              <div id="songs-wrapper" className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full mb-12">
                {songs.map(function(item, index) {
                  return (
                    <SongCard isChecked={dislikedSongs.includes(item)} key={item.song_title + index.toString()} title={item.song_title} artist={item.artist_name} onChangeToggle={() => handleToggle(item)} />
                  )})}
              </div>
            </Fragment>
            <AnimatePresence initial={false} exitBeforeEnter>
              {hasDislikedSongs&& (
                <motion.div 
                  className="flex justify-around items-center fixed bottom-0 w-full bg-white"

                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <BottomBar dislikedSongs={dislikedSongs} onRemoveSong={onRemoveSong} onGeneratePlaylist={generatePlaylist} />
                </motion.div>
              )}

            </AnimatePresence>
          </Fragment>
        )}
        {hasGeneratedPlaylist && (
          <div className="w-6/12 text-left">
            <h3 className="text-2xl font-bold mb-8 text-gray-700">Results Explorer</h3>
            <Select data={songs} onChange={handleClick} />
            <div className="mt-2">
              {selectedChartSong && (
                <Chart chosenSong={selectedChartSong} playlistSongs={songs}/>
              )}
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-8 text-gray-700">Attribute Explorer</h3>
              <BarChart playlistSongs={songs} />
            </div>
            <div className='mt-2'>
              <ContactForm />
            </div>

          </div>
        )}
      </main>
    </>
  )
}

export default Home
