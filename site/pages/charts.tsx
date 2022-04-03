import 'chart.js/auto';
import { Line, Radar } from 'react-chartjs-2';

export default function Charts(){
  const data = {
    labels: [
      'Loudness',
      'Tempo',
      'Artist Familiarity',
    ],
    datasets: [{
      label: 'Your Disliked Songs',
      data: [0.43, 0.32, 0.74],
      fill: true,
      backgroundColor: 'rgba(129, 140, 248, 0.2)',
      borderColor: 'rgb(129, 140, 248)',
      pointBackgroundColor: 'rgb(129, 140, 248)',
      pointBorderColor: '#F3F4F6',
      pointHoverBackgroundColor: '#F3F4F6',
      pointHoverBorderColor: 'rgb(129, 140, 248)'
    }, {
      label: 'Songs in Generated Playlist',
      data: [0.55, 0.75, 1.0],
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#F3F4F6',
      pointHoverBackgroundColor: '#F3F4F6',
      pointHoverBorderColor: 'rgb(54, 162, 235)'
    }]
  };
  return (
    <div className="chart-container">
      <Radar
        data={data}
        options={
          { maintainAspectRatio: false }
        }
      />
    </div>
  )

}