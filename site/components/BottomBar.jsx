import { motion } from 'framer-motion';
import { ArrowNarrowRightIcon, ChevronUpIcon, ChevronDownIcon, TrashIcon  } from '@heroicons/react/solid';
import { useState } from 'react';
import classNames from 'classnames';

export default function BottomBar({
  dislikedSongs,
  onGeneratePlaylist,
  onRemoveSong
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const variants = {
    open: { height: '66%' },
    closed: { height: '6rem' },
  };

  return (
    <motion.div 
      className={classNames("flex fixed bottom-0 w-full bg-white", {
        "items-center": !isExpanded,
        "justify-around": !isExpanded,
        "items-start": isExpanded,
        "pt-4": isExpanded,
        "flex-col": isExpanded
      })}
      animate={isExpanded ? "open" : "closed"}
      variants={variants}
    >
      <div className={classNames("flex justify-around w-full", {
        "border-b-2": isExpanded,
        "pb-4": isExpanded
      })}>
        <button
          type="button"
          onClick={toggleExpansion}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isExpanded ? (<ChevronDownIcon className="mr-2 -ml-0.5 h-4 w-4" aria-hidden="true" />) : (<ChevronUpIcon className="mr-2 -ml-0.5 h-4 w-4" aria-hidden="true" />) }
          All disliked songs ({dislikedSongs.length})
        </button>
        <button
          type="button"
          onClick={onGeneratePlaylist}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-gradient-to-r from-red-500 to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
          Generate Playlist
          <ArrowNarrowRightIcon className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      {isExpanded && dislikedSongs && dislikedSongs.length > 0 && (
         <div className="px-4 sm:px-6 lg:px-8 max-w-[50%] w-full self-center text-left" >
         <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
           <table className="min-w-full divide-y divide-gray-300">
             <thead className="bg-gray-50">
               <tr>
                 <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                   Song Title
                 </th>
                 <th
                   scope="col"
                   className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                 >
                   Artist
                 </th>
                 <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                   <span className="sr-only">Action</span>
                 </th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-200 bg-white">
               {dislikedSongs.map((song) => (
                 <tr key={song.song_title}>
                   <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                     {song.song_title}
                     <dl className="font-normal lg:hidden">
                       <dt className="sr-only">Artist Name</dt>
                       <dd className="mt-1 truncate text-gray-700">{song.artist_name}</dd>
                     </dl>
                   </td>
                   <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{song.artist_name}</td>
                   <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                     <a href="#" className="text-gray-400 hover:text-gray-600">
                       <TrashIcon className='h5 w-5' onClick={() => onRemoveSong(song)}/><span className="sr-only"></span>
                     </a>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>
      )}

    </motion.div>
  )
}