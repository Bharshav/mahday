import React from 'react'
import './TaskToDo.css'
import Paper from '@mui/material/Paper'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import TaskRow from '../TaskRow/TaskRow'
import { useSelector, useDispatch } from 'react-redux'
import { addTask } from '../../features/tasks/taskSlice'
import NewTaskPopUp from '../NewTaskPopUp/NewTaskPopUp'
import { datesAreInBetween } from '../TimeToDo/TimeToDo'
function TaskToDo() {
  const { currentViewDateStart, currentViewDateEnd, shouldShowAll:showAll } =
    useSelector((state) => state.calendar)
  const { searchTerm } = useSelector((state) => state.search)

  const tasks = useSelector((state) =>
    state.tasks.tasks.filter(
      (task) =>
        task.type === 'taskbased' &&
        (showAll || datesAreInBetween(
          currentViewDateStart,
          currentViewDateEnd,
          task.taskDate
        )) &&
        task.description.includes(searchTerm)
    )
  )
  return (
    <div>
      <div className='header'>
        <div className='shimmer'></div>
        <div className='todoheader' elevation={3}>
          <div>Task based</div>
          {/* <TaskRow /> */}
          <NewTaskPopUp taskType='task based' />
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

export default TaskToDo
