import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { PlayIcon } from '@heroicons/react/outline';
export default function SongCard({
  artist,
  onChangeToggle,
  title
}) {

  const [isChecked, setIsChecked] = useState(true);
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  return (
    <div className="relative flex flex-col p-3 mt-6 text-left bg-white border justify-evenly w-96 rounded-xl focus:text-indigo-600">
      <div className="flex w-full justify-evenly" >  
        <img className="w-12 h-12 border border-gray-100 rounded-full shadow-sm" src="https://randomuser.me/api/portraits/men/20.jpg" alt="user image" />
        <div className="flex flex-col text-center">    
          <div className="text-gray-600">{title}</div>
          <div className="text-sm text-gray-400">{artist}</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <PlayIcon className="w-5 h-5 stroke-green-500"/>
        </div>
      </div>
      <div className="flex items-center justify-center w-full gap-1 mt-4">
        <span className="text-sm color-gray-500">This vibe?</span>
        <motion.div
          style={{
            width: 20,
            height: 20,
            borderRadius: 8,
            backgroundColor: "#F1F5F9",
            cursor: "pointer",
          }}
          animate={{
              scale: isChecked ? 1 : 0.8,
              backgroundColor: isChecked
                  ? "rgba(241, 245, 249, 1)"
                  : "rgba(241, 245, 249 ,0.5)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onTap={() => setIsChecked(!isChecked)}
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 150 150"
          >
            <motion.path
                d="M38 74.707l24.647 24.646L116.5 45.5"
                fill="transparent"
                strokeWidth="15"
                stroke="#8B5CF6"
                strokeLinecap="round"
                initial={{ pathLength: 0.9, opacity: 1 }}
                animate={{ pathLength: isChecked ? 0.9 : 0 }}
                style={{ pathLength: pathLength, opacity: opacity }}
            />
          </svg>
        </motion.div>
      </div>
    </div>

  )
}