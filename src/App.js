import logo from './logo.svg'
import './App.css'
import TimeToDo from './components/TimeToDo/TimeToDo'
import TaskToDo from './components/TaskToDo/TaskToDo'
import AppHeader from './components/AppHeader/AppHeader'
import AppHeaderResponsive from './components/AppHeaderResponsive/AppHeaderResponsive'
import {pages} from './store/constants'
import DayLogger from './components/DayLogger/DayLogger'
import TaskProgress from './components/TaskProgress/TaskProgress'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
function App() {
  const { tasks } = useSelector((state) => state.tasks)
  const { currentPage } = useSelector((state) => state.pagenav)
  const [ allTasks, setAllTasks ] = useState(tasks)
  
  useEffect(() => {
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification')
    } else {
      console.log('Notifications are supported')
      Notification.requestPermission()
    }
    console.log(`initializing interval`)
    const interval = setInterval(() => {
      
        // console.log(tasks)
        const sendNotificationsFor =
          tasks.filter(
            (task) =>
              task.isCompleted === false &&
              moment().isSame(moment(task.taskDate), 'minute')
          )
        for(let i = 0; i < sendNotificationsFor.length; i++) {
          new Notification(`Task: ${sendNotificationsFor[i].description} is due now`)
        }
        // return tasks
      
    }, 60000)

    return () => {
      console.log(`clearing interval`)
      clearInterval(interval)
    }
  }, [tasks])
  return (
    <div className='TaskView'>
      <div className="appheader">

      <AppHeaderResponsive />
      </div>
      {/* <TaskProgress/> */}
      {currentPage == pages[0]?
      <div className='todo'>
        <div className='timetodo'>
          <TimeToDo />
        </div>
        <div className='tasktodo'>
          <TaskToDo />
        </div>
      </div>:(
        currentPage == pages[1]?<DayLogger/>:''
      )
      }
    </div>
  )
}

export default App
