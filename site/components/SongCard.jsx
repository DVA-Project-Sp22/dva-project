export default function SongCard({
  artist,
  onChangeToggle,
  title
}) {
  return (
    <div className="flex flex-col items-center justify-center bg-white mt-6 w-96 rounded-xl border p-6 text-left focus:text-indigo-600">      
      {title}
    </div>
  )
}