import 'chart.js/auto';
import { useCallback, useState } from 'react'
import { Line, Radar } from 'react-chartjs-2';
import Select from '../components/Select';
import Chart from '../components/Chart';

const fakeSongData = [
  {
    id: 1,
    name: 'Never Gonna Give You Up',
    loudness: 0.25,
    tempo: 0.5,
    artistFamiliarity: 0.88,
  },
  {
    id: 12,
    name: 'Complicated',
    loudness: 0.33,
    tempo: 0.35,
    artistFamiliarity: 0.75
  },
  
  {
    id: 13,
    name: 'My Friends Over You',
    loudness: 0.65,
    tempo: 0.75,
    artistFamiliarity: 0.55,
  },
  {
    id: 15,
    name: 'Hotel California',
    loudness: 0.39,
    tempo: 0.45,
    artistFamiliarity: 0.99,
  },
  {
    id: 16,
    name: 'Welcome to the Black Parade',
    loudness: 0.95,
    tempo: 0.55,
    artistFamiliarity: 0.85,
  },
];

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
    backgroundColor: 'rgba(248, 187, 129, 0.2)',
    borderColor: 'rgb(248, 187, 129)',
    pointBackgroundColor: 'rgb(248, 187, 129)',
    pointBorderColor: '#F3F4F6',
    pointHoverBackgroundColor: '#F3F4F6',
    pointHoverBorderColor: 'rgb(248, 187, 129)'
  }]
};

export default function Charts(){
  const [selected, setSelected] = useState();

  const handleClick = useCallback(selected => setSelected(selected), []);
  
  return (
    <div className="chart-container">
      <div>
        <Radar
          data={data}
          options={
            { maintainAspectRatio: false }
          }
        />
      </div>
      <div>
          <div>
            <Select data={fakeSongData} onChange={handleClick} />
            {selected && (
              <Chart chosenSong={selected}/>
            )}
          </div>
      </div>
    </div>
  )

}