import React from 'react'
import './TaskToDo.css'
import Paper from '@mui/material/Paper'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import TaskRow from '../TaskRow/TaskRow'
import { useSelector, useDispatch } from 'react-redux'
import { addTask } from '../../features/tasks/taskSlice'

function TaskToDo() {
  const tasks = useSelector((state) =>
    state.tasks.tasks.filter((task) => task.type === 'taskbased')
  )
  const dispatch = useDispatch()
  return (
    <div>
      <div className='header'>
        <Paper className='todoheader' elevation={3}>
          <div>Task based</div>
          {/* <TaskRow /> */}
          <Button
            variant='contained'
            className='addaction'
            onClick={() => {
              dispatch(
                addTask({
                  description: 'this is test',
                  completed: false,
                  type: 'taskbased',
                  typeprops: {
                    title: 'this is test',
                  },
                  taskDate: new Date(), //This can be bought from popup later
                })
              )
            }}
          >
            <AddIcon />
          </Button>
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
