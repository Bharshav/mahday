import logo from './logo.svg';
import './App.css';
import TimeToDo from './components/TimeToDo/TimeToDo';
import TaskToDo from './components/TaskToDo/TaskToDo';
import AppHeader from './components/AppHeader/AppHeader';

function App() {
  return (
    <div className="TaskView">
      
      <AppHeader/>
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
