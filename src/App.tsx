import React, { useCallback, useState } from 'react';

import { useJSONSockets } from './hooks/useSockets';
import { Dashboard, HistoryGraph, Loader, Temperature } from './components';
import { HistoryData } from './components/HistoryGraph';

const formatTimestamp = (timestamp?: string) => {
  if (!timestamp) {
    return '';
  }

  return new Date(timestamp).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

type TemperatureData = {
  temperature?: number;
  timestamp?: string;
  latestTemperatures?: number[];
};

const App = () => {
  const handleTemperatureReceived = useCallback((data: TemperatureData) => {
    setTemperature(data.temperature);
    setTimestamp(data.timestamp);

    if (data.latestTemperatures && data.latestTemperatures.length > 0) {
      setHistoryData(
        data.latestTemperatures.map((value: number, idx: number) => ({
          x: idx + 1,
          y: value,
        })),
      );
    }
  }, []);

  const { connecting, error } = useJSONSockets(
    process.env.REACT_APP_WEBSOCKET_SERVER!,
    handleTemperatureReceived,
  );
  const [temperature, setTemperature] = useState<number | undefined>(undefined);
  const [timestamp, setTimestamp] = useState<string | undefined>(undefined);
  const [historyData, setHistoryData] = useState<HistoryData>([]);

  if (connecting || temperature === undefined) {
    return (
      <Dashboard>
        <div>
          <Loader />
          <p>{connecting ? 'Připojování' : 'Čekání'}</p>
        </div>
      </Dashboard>
    );
  }

  if (error) {
    return (
      <Dashboard>
        <div>
          <p>Při načítání se vyskytla chyba.</p>
        </div>
      </Dashboard>
    );
  }

  return (
    <Dashboard>
      <div>
        <Temperature value={temperature} />
        <div>{formatTimestamp(timestamp)}</div>
      </div>
      <HistoryGraph points={historyData} />
    </Dashboard>
  );
};

export default App;
