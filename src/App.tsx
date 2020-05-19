import React, { useCallback, useEffect, useState } from 'react';
import { animated, Transition } from 'react-spring';

import {
  Dashboard,
  GlobalStyle,
  HistoryGraph,
  Loader,
  Temperature,
} from './components';
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

  const { state } = useJSONSockets<TemperatureData>(
    process.env.REACT_APP_WEBSOCKET_SERVER!,
    handleTemperatureReceived,
  );
  const [temperature, setTemperature] = useState<number | undefined>(undefined);
  const [timestamp, setTimestamp] = useState<string | undefined>(undefined);
  const [historyData, setHistoryData] = useState<HistoryValue[]>([]);
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowData(true), 250);
  }, [setShowData]);

  return (
    <>
      <GlobalStyle temperature={temperature} />
      <Dashboard>
        {showData && (
          <Transition
            items={temperature === undefined}
            from={{
              opacity: 0,
              position: 'absolute',
            }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
          >
            {(style, showLoader) => (
              <animated.div style={style}>
                {showLoader ? (
                  <Loader state={state} />
                ) : (
                  <>
                    <div>
                      <Temperature value={temperature!} />
                      <div>{formatTimestamp(timestamp)}</div>
                    </div>
                    <HistoryGraph points={historyData} />
                  </>
                )}
              </animated.div>
            )}
          </Transition>
        )}
      </Dashboard>
    </>
  );
};

export default App;
