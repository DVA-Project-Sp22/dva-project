import 'chart.js/auto';
import { Radar } from 'react-chartjs-2';


export default function Chart ({ chosenSong, playlistSongs }) {

  const getAverage = (prop) => {
    let total = 0;
    for(let i = 0; i < playlistSongs.length; i++) {
        total += playlistSongs[i][prop];
    }
    let avg = total / playlistSongs.length;
    return avg;
  };

  const data = {
    labels: [
      'Loudness',
      'Tempo',
      'Artist Familiarity',
    ],
    datasets: [{
      label: chosenSong.song_title,
      data: [chosenSong.loudness, chosenSong.tempo, chosenSong.artist_familiarity],
      fill: true,
      backgroundColor: 'rgba(129, 140, 248, 0.2)',
      borderColor: 'rgb(129, 140, 248)',
      pointBackgroundColor: 'rgb(129, 140, 248)',
      pointBorderColor: '#F3F4F6',
      pointHoverBackgroundColor: '#F3F4F6',
      pointHoverBorderColor: 'rgb(129, 140, 248)'
    }]
  };

  if (playlistSongs) {
    data.datasets.push({
      label: 'Songs in Generated Playlist',
      data: [getAverage('loudness'), getAverage('tempo'), getAverage('artist_familiarity')],
      fill: true,
      backgroundColor: 'rgba(248, 187, 129, 0.2)',
      borderColor: 'rgb(248, 187, 129)',
      pointBackgroundColor: 'rgb(248, 187, 129)',
      pointBorderColor: '#F3F4F6',
      pointHoverBackgroundColor: '#F3F4F6',
      pointHoverBorderColor: 'rgb(248, 187, 129)'
    });
  }

  return (
    <div>
      <Radar
        data={data}
        options={
          { maintainAspectRatio: false }
        }
      />
    </div>
 
  )
}