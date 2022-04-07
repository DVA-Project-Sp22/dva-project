import 'chart.js/auto';
import { Radar } from 'react-chartjs-2';


export default function Chart ({ chosenSong }) {
  console.log(chosenSong);
  const data = {
    labels: [
      'Loudness',
      'Tempo',
      'Artist Familiarity',
    ],
    datasets: [{
      label: chosenSong.name,
      data: [chosenSong.loudness, chosenSong.tempo, chosenSong.artistFamiliarity],
      fill: true,
      backgroundColor: 'rgba(129, 140, 248, 0.2)',
      borderColor: 'rgb(129, 140, 248)',
      pointBackgroundColor: 'rgb(129, 140, 248)',
      pointBorderColor: '#F3F4F6',
      pointHoverBackgroundColor: '#F3F4F6',
      pointHoverBorderColor: 'rgb(129, 140, 248)'
    }]
  };

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