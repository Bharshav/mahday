import React from 'react'
import Paper from '@mui/material/Paper'
import './TimeToDo.css'
import AddIcon from '@mui/icons-material/Add'

import Button from '@mui/material/Button'
import { useSelector, useDispatch } from 'react-redux'
import { addTask } from '../../features/tasks/taskSlice'
import TaskRow from '../TaskRow/TaskRow'
function TimeToDo() {
  const tasks = useSelector((state) =>
    state.tasks.tasks.filter((task) => task.type === 'timebased')
  )
  const dispatch = useDispatch()
  return (
    <div>
      <div className='header'>
        <Paper className='todoheader' elevation={3}>
          <div>Time based</div>
          {/* <TaskRow /> */}
          <Button
            variant='contained'
            className='addaction'
            onClick={() => {
              dispatch(
                addTask({
                  description: 'this is test',
                  completed: false,
                  type: 'timebased',
                  typeprops: {
                    title: 'this is test',
                  },
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

export default TimeToDo
