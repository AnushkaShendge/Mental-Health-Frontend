import React, { useEffect } from "react";
import { Button } from './components/ui/button';
import { useAppState } from "./AppStateContext";
import { Calendar } from "./components/ui/calendar"
import { CalendarDemo } from './page/calander';
import Login from "./components/ui/login/login.jsx";
import Chatbot from "./components/chatbot/chatbot.jsx";
function App() {
  const { loggedIn } = useAppState();

  useEffect(() => {
    document.body.style.backgroundColor = loggedIn ? "#1D1D2D" : "turquoise";
  }, [loggedIn]);

  return (
    
    <>
      {!loggedIn && <Login/>}
      {loggedIn && (
    <div className="app">
      <Chatbot/></div>)}
      <div className='App flex min-h-screen justify-center items-center'>
        <Button>Code</Button>
        <CalendarDemo/>
      </div>
    </>
  );
}

export default App;
