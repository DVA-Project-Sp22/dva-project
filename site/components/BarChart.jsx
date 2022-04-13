import 'chart.js/auto'
import { Bar } from 'react-chartjs-2'

export default function Chart({ playlistSongs }) {
  function generatePastelColor() {
    let R = Math.floor(Math.random() * 127 + 127)
    let G = Math.floor(Math.random() * 127 + 127)
    let B = Math.floor(Math.random() * 127 + 127)

    let rgb = (R << 16) + (G << 8) + B
    let value = `#${rgb.toString(16)}`

    return {
      backgroundColor: value,
      borderColor: value,
    }
  }

  const createDatasets = () => {
    return playlistSongs.map(function (song) {
      const { backgroundColor, borderColor } = generatePastelColor()
      return {
        label: song.song_title,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
        data: [song.loudness, song.tempo, song.artist_familiarity],
      }
    })
  }

  const data = {
    labels: ['Loudness', 'Tempo', 'Artist Familiarity'],
    datasets: createDatasets(),
  }

  return (
    <div>
      <Bar
        data={data}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  )
}
