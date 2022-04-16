import { motion } from 'framer-motion'
import { PlayIcon, ThumbDownIcon } from '@heroicons/react/solid'
import { ThumbDownIcon as OutlineThumb } from '@heroicons/react/outline'

export default function SongCard({
  artist,
  image,
  isChecked,
  onChangeToggle,
  playUrl,
  title,
}) {
  const MotionIcon = motion(PlayIcon)

  return (
    <div className="relative mt-6 flex w-96 flex-col justify-evenly rounded-xl border bg-white p-[20px] text-left">
      <div className="flex w-full">
        <div className="relative flex-none">
          <img
            className="h-[75px] w-[75px] rounded border border-gray-100 shadow-sm "
            src={
              image ? image : 'https://randomuser.me/api/portraits/men/20.jpg'
            }
            alt="user image"
          />
          <div className="absolute flex items-center justify-center p-2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 rounded-full top-1/2 left-1/2">
            <motion.a href={playUrl} target="_blank">
              <MotionIcon
                whileHover={{ opacity: 1, scale: 1.2 }}
                className="w-8 h-8 cursor-pointer fill-green-500"
              />
            </motion.a>
          </div>
        </div>

        <div className="flex justify-between w-full ml-2">
          <div className="flex flex-col">
            <div className="font-semibold text-gray-600">{title}</div>
            <div className="text-sm text-gray-400">{artist}</div>
          </div>
          <div className="cursor-pointer h-fit" onClick={onChangeToggle}>
            {isChecked ? (
              <ThumbDownIcon className="w-6 h-6 fill-orange-300 stroke-orange-400 " />
            ) : (
              <OutlineThumb className="w-6 h-6 stroke-gray-400 " />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
