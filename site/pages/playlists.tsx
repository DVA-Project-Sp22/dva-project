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
        <h2 className="text-2xl">Created Playlists</h2>
        {loading ? (
          <div>Loading playlist info...</div>
        ) :
          playlists.map(function(item, index) {
            return (
              <div key={item.id} className="flex flex-col items-center justify-center bg-white mt-6 w-96 rounded-xl border p-6 text-left focus:text-indigo-600">      
                <div>{item.name}</div>
                <button
                  type="button"
                  className="inline-flex items-center px-6 py-3 mt-4 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <a className="w-full" href={item.external_urls?.spotify}>
                    Open in Spotify
                  </a>
                </button>
              </div>
            )
          })}

      </div>
    </div>
  )
}