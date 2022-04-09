import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { PlayIcon, ThumbDownIcon } from '@heroicons/react/solid';
import { ThumbDownIcon as OutlineThumb } from '@heroicons/react/outline';

export default function SongCard({
  artist,
  onChangeToggle,
  title
}) {

  const [isChecked, setIsChecked] = useState(false);

  const toggleChecked = () => {
    setIsChecked(!isChecked);
    onChangeToggle();
  };

  return (
    <div className="relative flex flex-col p-[20px] mt-6 text-left bg-white border justify-evenly w-96 rounded-xl">
      <div className="flex w-full">  
        <img className=" w-24 h-24 border border-gray-100 rounded shadow-sm" src="https://randomuser.me/api/portraits/men/20.jpg" alt="user image" />
        <div className="ml-2 flex justify-between flex-auto">
          <div className="flex flex-col">    
            <div className="text-gray-600 font-semibold">{title}</div>
            <div className="text-sm text-gray-400">{artist}</div>
          </div>
          <div className='cursor-pointer h-fit' onClick={toggleChecked}>
            {isChecked ? (
              <ThumbDownIcon className='w-6 h-6 fill-orange-300 stroke-orange-400 ' />
            ) : (
              <OutlineThumb className='w-6 h-6 stroke-gray-400 '/>
            ) }
          </div>
        </div>
      </div>
    </div>

  )
}