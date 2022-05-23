import React from 'react'
import Paper from '@mui/material/Paper'
import './TimeToDo.css'
import AddIcon from '@mui/icons-material/Add'

import Button from '@mui/material/Button'
import { useSelector, useDispatch } from 'react-redux'
import { addTask } from '../../features/tasks/taskSlice'
import TaskRow from '../TaskRow/TaskRow'
import NewTaskPopUp from '../NewTaskPopUp/NewTaskPopUp'
import moment from 'moment';

export const datesAreInBetween = (first, second,date) =>{
  // console.log(typeof(first),first)
  
first = moment(first.substring(0,10))
second = moment(second.substring(0,10))
date = new Date(date)

return first<=date && date <second //move to helper
}

function TimeToDo() {
  const {currentViewDateStart,currentViewDateEnd,showAll} = useSelector((state) => state.calendar)
  const {searchTerm} = useSelector((state) => state.search)
  const tasks = useSelector((state) =>
    state.tasks.tasks.filter(
      (task) =>
        task.type === 'timebased' &&
        (showAll || datesAreInBetween(currentViewDateStart, currentViewDateEnd,task.taskDate)) && task.description.includes(searchTerm)
    )
  )
  return (
    <div>
      <div className='header'>
        <div className="shimmer"></div>
        <div className='todoheader' elevation={3}>
          <div>Time based</div>
          {/* <TaskRow /> */}
          <NewTaskPopUp taskType='time based'/>
        </div>
      </div>
      {tasks.map((task) => (
        <TaskRow
          key={task.id}
          tid={task.id}
          isCompleted={task.isCompleted}
          isEditable={task.isEditable}
          data={task.description}
          task={task}
        />
      ))}
    </div>
  )
}

export default TimeToDo
