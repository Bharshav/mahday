import React from 'react'
import Paper from '@mui/material/Paper'
import './TimeToDo.css'
import AddIcon from '@mui/icons-material/Add'

import Button from '@mui/material/Button'
import { useSelector, useDispatch } from 'react-redux'
import { addTask } from '../../features/tasks/taskSlice'
import TaskRow from '../TaskRow/TaskRow'
import NewTaskPopUp from '../NewTaskPopUp/NewTaskPopUp'

export const datesAreInBetween = (first, second,date) =>{
  // console.log(typeof(first),first)
first = new Date(first.substring(0,10))
second = new Date(second.substring(0,10))
date = new Date(date)

return first<=date && date <=second //move to helper
}

function TimeToDo() {
  const {currentViewDateStart,currentViewDateEnd} = useSelector((state) => state.calendar)
  const tasks = useSelector((state) =>
    state.tasks.tasks.filter(
      (task) =>
        task.type === 'timebased' &&
        datesAreInBetween(currentViewDateStart, currentViewDateEnd,task.taskDate)
    )
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
