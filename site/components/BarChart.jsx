import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';


export default function Chart ({ playlistSongs }) {

  const createDatasets = () => {
    return playlistSongs.map(function(song){
      return {
        label: song.song_title,
        backgroundColor: "pink",
        borderColor: "red",
        borderWidth: 1,
        data: [song.loudness, song.tempo, song.artist_familiarity],
      }
    })
  };

  const data = {
    labels: [
      'Loudness',
      'Tempo',
      'Artist Familiarity',
    ],
    datasets: createDatasets()
  };


  return (
    <div>
      <Bar
        data={data}
        options={
          {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        }
      />
    </div>
 
  )
}