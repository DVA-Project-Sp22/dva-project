// @ts-nocheck

import { useEffect, useState } from 'react';

export default function Playlists(){
  const [loading, setLoading] = useState(true);
  const [playlists, setPlaylists] = useState([]);

  const fetchPlaylists = async () => {
    // post to the api
    const response = await fetch('/api/get-user-playlist', {
      method: 'GET',
    });
    if (response) {
      const data = await response.json();
      const { items, owner } = data;
      setPlaylists(items);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <div className="w-full">
      <div className="relative py-16 overflow-hidden flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold">Created Playlists</h2>
        {loading ? (
          <div>Loading playlist info...</div>
        ) :
          playlists.map(function(item, index) {
            return (
              <div key={item.id} className="flex flex-col items-center justify-center bg-white mt-6 w-96 rounded-xl border p-6 text-left focus:text-indigo-600">      
                <div>{item.name}</div>
                <button
                  type="button"
                  className="transition ease-in-out duration-300 inline-flex items-center px-6 py-3 mt-4 text-base font-medium text-grey-500 bg-white-600 border border-grey-200 rounded-full hover:shadow-md hover:shadow-green-500/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <a className="w-full" href={item.external_urls?.spotify}>
                    Open in Spotify
                  </a>
                  <img src="/spotify.svg" className="w-6 h-6 ml-2" />
                </button>
              </div>
            )
          })}

      </div>
    </div>
  )
}