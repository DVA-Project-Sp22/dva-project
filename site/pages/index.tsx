import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import SongCard from '../components/SongCard';

const Home: NextPage = () => {
  const [songs, setSongs] = useState<any[]>([])

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
    }
  };
  
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 py-4 text-center">

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          {songs.map(function(item, index) {
            return (
              <SongCard key={item.song_title + index.toString()} title={item.song_title} artist={item.artist_name} onChangeToggle={undefined} />
            )})}
        </div>
        <button
          type="button"
          className="inline-flex items-center px-6 py-3 mt-4 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={generatePlaylist}
        >
          Generate Playlist
        </button>
      </main>
    </>
  )
}

export default Home
