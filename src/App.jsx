import React, { useEffect, useState } from 'react';
import { AppStateProvider, useAppState } from "./AppStateContext";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import Dashboard from './components/ui/dashboard/pages/Dashboard';
import ChatFeed from './components/ui/ChatPage/ChatFeed';
import LoginForm from './components/ui/ChatPage/LoginForm';
import './style.css';
import './components/ui/ChatPage/ChatPage.css';
import Login from "./components/ui/login/login";
import { Home } from "./components/ui/Blog/Pages/Home";
import { Blog } from "./components/ui/Blog/Pages/Blog";
import NewPost from './components/ui/Blog/Pages/NewPost/NewPost';
import HomeLanding from "./components/ui/landingPage/Components/AllComponents/HomeLanding";
import ThemeContext from "./components/ui/landingPage/Components/ContextWrapper/ThemeContext";
import Header from "./components/ui/games/Componets/Header";
import HomeGame from "./components/ui/games/Pages/HomeGame";
import { ThemeContextGame } from './components/ui/games/Context/ThemeContext';

import './output.css';
import "./App.css";

const projectID = '121610f8-3526-459f-8ebd-39ed9a4b79e9';

function App() {
  const { loggedIn } = useAppState();
  const location = useLocation();
  const navigate = useNavigate();
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  const API_URL = 'http://localhost:3500/blogs';

  const [blogs, setBlogs] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddBlog = (newBlog) => {
    setBlogs([...blogs, newBlog]);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Did not receive expected data');
        const bloglist = await response.json();
        setBlogs(bloglist);
        setFetchError(null);
      } catch (err) {
        console.log(err.message);
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 1000);

  }, []);

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]);

  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setTheme(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark');
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<ThemeContext><HomeLanding /></ThemeContext>} />
        <Route path="/dashboard" element={loggedIn ? <Dashboard /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chats" element={loggedIn ? <ChatComponent /> : <Login />} />
        <Route path="/blog" exact element={loggedIn ? <Home /> : <Login />} />
        <Route path="/NewPost" element={<NewPost handleAddBlog={handleAddBlog} blogs={blogs} setBlogs={setBlogs} setFetchError={setFetchError} />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route
          path="/game"
          element={
            <ThemeContextGame.Provider value={{ theme, setTheme }}>
              <div className={`${theme} ${theme === 'dark' ? 'bg-[#121212]' : 'bg-white'}`}>
                <Header />
                <HomeGame />
              </div>
            </ThemeContextGame.Provider>
          }
        />
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
