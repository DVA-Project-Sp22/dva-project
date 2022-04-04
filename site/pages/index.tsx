import type { NextPage } from 'next'
import Head from 'next/head'
import SongCard from '../components/SongCard';

const Home: NextPage = () => {

  const mockData = new Array<any>(6).fill({ title: 'test'});
  const generateTestPlaylist = async (event: any) => {
    event.preventDefault();

    // post to the api
    const response = await fetch('/api/add-to-playlist', {
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

      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          {mockData.map(function(item, index) {
            return (
              <SongCard key={item.title + index.toString()} title={item.title} artist={undefined} onChangeToggle={undefined} />
            )})}

        </div>
        <button
          type="button"
          className="inline-flex items-center px-6 py-3 mt-4 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={generateTestPlaylist}
        >
          Generate Test Playlist
        </button>
      </main>
    </>
  )
}

export default Home
