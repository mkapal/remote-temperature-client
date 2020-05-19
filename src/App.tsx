import React, { useCallback, useState } from 'react';

import { Dashboard, HistoryGraph, Loader, Temperature } from './components';
import { HistoryValue } from './components/HistoryGraph';
import { useJSONSockets } from './hooks/useSockets';
import { formatTimestamp } from './utils';

type TemperatureData = {
  temperature?: number;
  timestamp?: string;
  latestTemperatures?: number[];
};

const App = () => {
  const handleTemperatureReceived = useCallback(
    ({ latestTemperatures, temperature, timestamp }: TemperatureData) => {
      setTemperature(temperature);
      setTimestamp(timestamp);

      if (latestTemperatures && latestTemperatures.length > 0) {
        setHistoryData(
          latestTemperatures.map((value: number, idx: number) => ({
            x: idx + 1,
            y: value,
          })),
        );
      }
    },
    [],
  );

  const { state } = useJSONSockets(
    process.env.REACT_APP_WEBSOCKET_SERVER!,
    handleTemperatureReceived,
  );
  const [temperature, setTemperature] = useState<number | undefined>(undefined);
  const [timestamp, setTimestamp] = useState<string | undefined>(undefined);
  const [historyData, setHistoryData] = useState<HistoryValue[]>([]);

  if (temperature === undefined) {
    return (
      <Dashboard>
        <div>
          <Loader state={state} />
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
