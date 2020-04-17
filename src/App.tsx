import React, { useEffect, useState } from 'react';
import Sockette from 'sockette';
import styled from 'styled-components';

import spinner from './assets/spinner.svg';

import { HistoryGraph } from './components';
import { HistoryData } from './components/HistoryGraph';

const Dashboard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
  height: 100%;
  background: linear-gradient(to bottom, #1e5799 0%, #2989d8 50%, #7db9e8 100%);
  color: #fff;
`;

const Temperature = styled.div`
  font-size: 30vw;
  font-weight: 300;
  margin-bottom: 15px;
`;

function formatTemperature(value: number) {
  const fixedString = value.toFixed();
  return (fixedString === '-0' ? '0' : fixedString) + '°';
}

const App = () => {
  const [connecting, setConnecting] = useState(true);
  const [error, setError] = useState(false);
  const [temperature, setTemperature] = useState<number | undefined>(undefined);
  const [timestamp, setTimestamp] = useState<string | undefined>(undefined);
  const [historyData, setHistoryData] = useState<HistoryData>([]);

  useEffect(() => {
    const sockette = new Sockette(process.env.REACT_APP_WEBSOCKET_SERVER!, {
      timeout: 1000,
      maxAttempts: 10,
      onopen: () => {
        setConnecting(false);
        setError(false);
        console.info('Connected');
      },
      onmessage: event => {
        try {
          const data = JSON.parse(event.data);

          if (data.hasOwnProperty('temperature')) {
            setTemperature(data.temperature);
          }

          if (data.hasOwnProperty('timestamp')) {
            setTimestamp(data.timestamp);
          }

          if (
            data.hasOwnProperty('latestTemperatures') &&
            data.latestTemperatures.length > 0
          ) {
            setHistoryData(
              data.latestTemperatures.map((val: number, idx: number) => ({
                x: idx + 1,
                y: val,
              })),
            );
          }
        } catch (error) {
          console.warn('Could not parse received data:', event.data);
          console.error('Error:', error);
        }
      },
      onreconnect: () => {
        setConnecting(true);
        console.info('Reconnecting...');
      },
      onmaximum: () => {
        setConnecting(false);
        console.warn('Stop attempting');
      },
      onclose: () => {
        setConnecting(false);
        console.warn('Closed');
      },
      onerror: () => {
        setConnecting(false);
        setError(true);
        console.error('Connection error');
      },
    });
    return () => {
      sockette.close();
    };
  }, []);

  if (connecting && temperature === undefined) {
    return (
      <Dashboard>
        <div>
          <img src={spinner} alt="Načítání" />
          <p>{connecting ? 'Připojování' : 'Čekání'}</p>
        </div>
      </Dashboard>
    );
  }

  const dateOptions = {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  return (
    <Dashboard>
      <Temperature>
        {temperature !== undefined ? formatTemperature(temperature) : '-'}
      </Temperature>
      <div>
        {timestamp !== undefined
          ? new Date(timestamp).toLocaleDateString('cs', dateOptions)
          : ''}
      </div>
      <HistoryGraph points={historyData} />
    </Dashboard>
  );
};

export default App;
