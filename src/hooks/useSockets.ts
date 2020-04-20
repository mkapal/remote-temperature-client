import { useEffect, useState } from 'react';
import Sockette from 'sockette';

export const useJSONSockets = <Data>(
  serverUrl: string,
  onMessage: (data: Data) => void,
) => {
  const [connecting, setConnecting] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const sockette = new Sockette(serverUrl, {
      timeout: 1000,
      maxAttempts: 10,
      onopen: () => {
        setConnecting(false);
        setError(false);
        console.info('Connected');
      },
      onmessage: event => {
        try {
          const data = JSON.parse(event.data) as Data;
          onMessage(data);
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
  }, [onMessage]);

  return {
    connecting,
    error,
  };
};
