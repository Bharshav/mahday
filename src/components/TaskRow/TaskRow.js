import React, { useState } from 'react'
import './TaskRow.css'
import DoneIcon from '@mui/icons-material/Done'
import DangerousIcon from '@mui/icons-material/Dangerous'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import RedoIcon from '@mui/icons-material/Redo'
import SaveIcon from '@mui/icons-material/Save'
import { Button, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  setEditable,
  markAsCompleted,
  deleteTask,
  moveTo,
} from '../../features/tasks/taskSlice'
import moment from 'moment'

function TaskRow(props) {
  const [description, setDescription] = useState(props.data)
  const { currentViewDateStart,currentViewDateEnd,showAll } = useSelector((state) => state.calendar)

  const dispatch = useDispatch()
  const handleChange = (event) => {
    setDescription(event.target.value)
  }
  return (
    <div className='tasktimerow'>
      <div
        className={'taskrow ' + (props.isCompleted ? 'completed' : '')}
        key={props.tid}
      >
        <div className='taskdesc'>
          {props.isEditable ? (
            <div className='edittasktext'>
              <TextField
                id='outlined-multiline-flexible fullWidth'
                label='Task description'
                fullWidth
                margin='normal'
                multiline
                maxRows={4}
                value={description}
                onChange={handleChange}
              />
            </div>
          ) : (
            <div className='description'>{description}</div>
          )}
        </div>
        <div className='actions'>
          <Button
            onClick={() =>
              dispatch(
                markAsCompleted({
                  id: props.tid,
                  completeStatus: !props.isCompleted,
                })
              )
            }
            variant='contained'
            className='actionbutton'
            color='success'
          >
            <DoneIcon style={{ color: 'white' }} />
          </Button>
          <Button
            variant='contained'
            onClick={() =>
              dispatch(
                deleteTask({
                  id: props.tid,
                })
              )
            }
            className='actionbutton'
            color='error'
          >
            <DangerousIcon style={{ color: 'white' }} />
          </Button>
          <Button
            variant='contained'
            className='actionbutton'
            color='primary'
            onClick={() =>
              dispatch(
                setEditable({
                  id: props.tid,
                  editstatus: !props.isEditable,
                  description: description,
                })
              )
            }
          >
            {!props.isEditable ? (
              <ModeEditIcon style={{ color: 'white' }} />
            ) : (
              <SaveIcon style={{ color: 'white' }} />
            )}
          </Button>
          <Button
            variant='contained'
            style={{ backgroundColor: '#f44336' }}
            onClick={() =>
              dispatch(
                moveTo({
                  id: props.tid,
                })
              )
            }
            className='actionbutton'
            color='error'
          >
            <RedoIcon style={{ color: 'white' }} />
          </Button>
        </div>
        {props.task.type == 'timebased' ? (
          <div className='time'>
            {(showAll || !(moment(currentViewDateEnd).diff(moment(currentViewDateStart), 'days')==1 ))?
            <div className='timetext'>
              {moment(props.task.taskDate).format('MMM Do YYYY  ')}
            </div>:''}
            <div className='timetexttime'>
              {moment(props.task.taskDate).format('hh:mm a')}
            </div>
          </div>
        ) : ( (showAll ||
          !(moment(currentViewDateEnd).diff(moment(currentViewDateStart), 'days')==1 ))?
            <div className='time'>           <div className='timetext'>
              {moment(props.task.taskDate).format('MMM Do YYYY  ')}
            </div></div>:''
        )}
      </div>
    </div>
  )
}

export default TaskRow
