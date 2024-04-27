import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import Dashboard from './components/ui/dashboard/pages/Dashboard';
import ChatFeed from './components/ui/ChatPage/ChatFeed';
import LoginForm from './components/ui/ChatPage/LoginForm';
import './components/ui/dashboard/css/style.css';
import './components/ui/ChatPage/ChatPage.css';
import {Auth} from './components/ui/ChatPage/Auth';
//import MyWebSocketComponent from './components/ui/ChatPage/Websocket'; // Import MyWebSocketComponent

const projectID = '121610f8-3526-459f-8ebd-39ed9a4b79e9';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Reset scroll position on route change
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]);

  return (
    <div>
      {/* Render MyWebSocketComponent as a child component */}
      {/* <MyWebSocketComponent /> */}

      {/* Define routes for Dashboard and ChatComponent */}
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/chats" element={<ChatComponent />} />
      </Routes>
    </div>
  );
}

// Define ChatComponent to render ChatEngine
function ChatComponent() {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  // Check if username or password is missing
  if (!username || !password) {
    return <LoginForm />;
    <Auth />
  }

  return (
    <ChatEngine
      height="100vh"
      projectID={projectID}
      userName={username}
      userSecret={password}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    />
  );
}

export default App;
