import React from 'react'
import './TaskToDo.css'
import Paper from '@mui/material/Paper'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import TaskRow from '../TaskRow/TaskRow'
import { useSelector, useDispatch } from 'react-redux'
import { addTask } from '../../features/tasks/taskSlice'
import NewTaskPopUp from '../NewTaskPopUp/NewTaskPopUp'
import { datesAreOnSameDay } from '../TimeToDo/TimeToDo'
function TaskToDo() {
  const { currentViewDate } = useSelector((state) => state.calendar)
  const tasks = useSelector((state) =>
    state.tasks.tasks.filter(
      (task) =>
        task.type === 'taskbased' &&
        datesAreOnSameDay(task.taskDate, currentViewDate)
    )
  )
  return (
    <div>
      <div className='header'>
        <Paper className='todoheader' elevation={3}>
          <div>Task based</div>
          {/* <TaskRow /> */}
          <NewTaskPopUp taskType='task based' />
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

export default TaskToDo
