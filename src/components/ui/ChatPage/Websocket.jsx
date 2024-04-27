import React from 'react';
import WebSocket from 'nextjs-websocket';

const MyWebSocketComponent = () => {
  const handleOpen = () => {
    console.log('WebSocket connection opened');
    // Perform actions on WebSocket open
  };

  const handleMessage = (message) => {
    console.log('Received message from WebSocket:', message);
    // Handle incoming WebSocket messages
  };

  const handleError = (error) => {
    console.error('WebSocket error:', error);
    // Handle WebSocket errors
  };

  const handleClose = () => {
    console.log('WebSocket connection closed');
    // Perform cleanup or reconnection logic on WebSocket close
  };

  return (
    <WebSocket
      url="ws://example.com/websocket"
      onOpen={handleOpen}
      onMessage={handleMessage}
      onError={handleError}
      onClose={handleClose}
      reconnect // Enable automatic reconnection
      reconnectIntervalInMilliSeconds={3000} // Reconnection interval
    />
  );
};

export default MyWebSocketComponent;
