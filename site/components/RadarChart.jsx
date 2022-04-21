import 'chart.js/auto'
import { Radar } from 'react-chartjs-2'

export default function RadarChart({ dislikedSongs, playlistSongs }) {
  const getAverage = (prop, playlistArray) => {
    let total = 0
    for (let i = 0; i < playlistArray.length; i++) {
      total += playlistArray[i][prop]
    }
    let avg = total / playlistArray.length
    return avg
  }

  const data = {
    labels: ['Loudness', 'Tempo', 'Artist Familiarity'],
    datasets: [
      {
        label: 'Disliked Songs',
        data: [
          getAverage('loudness', dislikedSongs),
          getAverage('tempo', dislikedSongs),
          getAverage('artist_familiarity', dislikedSongs),
        ],
        fill: true,
        backgroundColor: 'rgba(129, 140, 248, 0.2)',
        borderColor: 'rgb(129, 140, 248)',
        pointBackgroundColor: 'rgb(129, 140, 248)',
        pointBorderColor: '#F3F4F6',
        pointHoverBackgroundColor: '#F3F4F6',
        pointHoverBorderColor: 'rgb(129, 140, 248)',
      },
    ],
  }

  if (playlistSongs) {
    data.datasets.push({
      label: 'Songs in Generated Playlist',
      data: [
        getAverage('loudness', playlistSongs),
        getAverage('tempo', playlistSongs),
        getAverage('artist_familiarity', playlistSongs),
      ],
      fill: true,
      backgroundColor: 'rgba(248, 187, 129, 0.2)',
      borderColor: 'rgb(248, 187, 129)',
      pointBackgroundColor: 'rgb(248, 187, 129)',
      pointBorderColor: '#F3F4F6',
      pointHoverBackgroundColor: '#F3F4F6',
      pointHoverBorderColor: 'rgb(248, 187, 129)',
    })
  }

  return (
    <div>
      <Radar data={data} options={{ maintainAspectRatio: false }} />
    </div>
  )
}
