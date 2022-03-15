import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header';
import Footer from '../components/Footer';
import SongCard from '../components/SongCard';

const Home: NextPage = () => {

  const mockData = new Array<any>(6).fill({ title: 'test'});

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          {mockData.map(function(item, index) {
            return (
              <SongCard title={item.title} artist={undefined} onChangeToggle={undefined} />
            )})}

        </div>
        <button
          type="button"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate Playlist
        </button>
      </main>

      <Footer />

    </div>
  )
}

export default Home
