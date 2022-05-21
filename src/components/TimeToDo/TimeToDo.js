import React from 'react'
import Paper from '@mui/material/Paper'
import './TimeToDo.css'
import AddIcon from '@mui/icons-material/Add'

import Button from '@mui/material/Button'
import { useSelector, useDispatch } from 'react-redux'
import { addTask } from '../../features/tasks/taskSlice'
import TaskRow from '../TaskRow/TaskRow'
import NewTaskPopUp from '../NewTaskPopUp/NewTaskPopUp'

export const datesAreOnSameDay = (first, second) =>{
first = new Date(first)
second = new Date(second)
return first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate() //move to helper
}

function TimeToDo() {
  const {currentViewDate} = useSelector((state) => state.calendar)
  const tasks = useSelector((state) =>
    state.tasks.tasks.filter((task) => task.type === 'timebased' && datesAreOnSameDay(task.taskDate, currentViewDate))
  )
  return (
    <div>
      <div className='header'>
        <Paper className='todoheader' elevation={3}>
          <div>Time based</div>
          {/* <TaskRow /> */}
          <NewTaskPopUp taskType='time based'/>
        </Paper>
      </div>
      {tasks.map((task) => (
        <TaskRow
          key={task.id}
          tid={task.id}
          isEditable={task.isEditable}
          data={task.description}
        />
      ))}
    </div>
  )
}

export default TimeToDo
