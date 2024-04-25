import { Button } from './components/ui/button';
import { Calendar } from "./components/ui/calendar"
import { CalendarDemo } from './page/calander';


function App() {
  return (
    <div className='App flex min-h-screen justify-center items-center'>
      <Button>Code</Button>
      <CalendarDemo/>
    </div>
  );
}

export default App;
