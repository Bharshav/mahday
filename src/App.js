import logo from './logo.svg';
import './App.css';
import TimeToDo from './components/TimeToDo/TimeToDo';
import TaskToDo from './components/TaskToDo/TaskToDo';
import AppHeader from './components/AppHeader/AppHeader';
import TaskProgress from './components/TaskProgress/TaskProgress';

function App() {
  return (
    <div className="TaskView">
      
      <AppHeader/>
      {/* <TaskProgress/> */}
      <div className="todo">
        <div className="timetodo">
          <TimeToDo/>
        </div>
        <div className="tasktodo">
          <TaskToDo/>
        </div>
      </div>
    </div>
  );
}

export default App;
