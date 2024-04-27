import React, { useEffect } from 'react';
import { AppStateProvider, useAppState } from "./AppStateContext";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import Dashboard from './components/ui/dashboard/pages/Dashboard';
import ChatFeed from './components/ui/ChatPage/ChatFeed';
import LoginForm from './components/ui/ChatPage/LoginForm';
import './components/ui/dashboard/css/style.css';
import './components/ui/ChatPage/ChatPage.css';
import Login from "./components/ui/login/login";

const projectID = '121610f8-3526-459f-8ebd-39ed9a4b79e9';

function App() {
  const { loggedIn } = useAppState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Reset scroll position on route change
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]);

 

  useEffect(() => {
    if (!loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/dashboard" element={loggedIn ? <Dashboard /> : <navigate to="/" />} />
        <Route path='/chats' element={<ChatComponent/>} />
      </Routes>
    </div>
  );
}

function ChatComponent() {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  if (!username || !password) {
    return <LoginForm />;
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

export default function WrappedApp() {
  return (
    <AppStateProvider>
      <App />
    </AppStateProvider>
  );
}
