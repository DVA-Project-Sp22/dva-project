import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
export default function SongCard({
  artist,
  onChangeToggle,
  title
}) {

  const [isChecked, setIsChecked] = useState(true);
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  return (
    <div className="flex flex-col items-center justify-center bg-white mt-6 w-96 rounded-xl border p-6 text-left focus:text-indigo-600">      
      <div>{title}</div>
      <div>{artist}</div>
      <div className="flex items-center gap-1">
        <span>This vibe?</span>
        <motion.div
          style={{
            width: 40,
            height: 40,
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
              width="40"
              height="40"
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