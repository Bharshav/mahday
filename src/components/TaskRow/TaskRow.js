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
import doneAudio from '../../notifications/Done.mp3'

import moment from 'moment'
import { FeatureFlags } from '../../features/featureflags/featureFlagSlice'

function TaskRow(props) {
  
  const featureFlags = useSelector((store) => store.featureFlag)
  const [description, setDescription] = useState(props.data)
  const { currentViewDateStart, currentViewDateEnd, shouldShowAll } =
    useSelector((state) => state.calendar)

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
            onClick={() => {
              dispatch(
                markAsCompleted({
                  id: props.tid,
                  completeStatus: !props.isCompleted,
                })
              )
              
              if (!props.isCompleted && featureFlags[FeatureFlags.PLAYSOUND]) {
              new Audio(doneAudio).play()
              }
            }}
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
            {shouldShowAll ||
            !(
              moment(currentViewDateEnd).diff(
                moment(currentViewDateStart),
                'days'
              ) == 1
            ) ? (
              <div className='timetext'>
                {moment(props.task.taskDate).format('MMM Do YYYY  ')}
              </div>
            ) : (
              ''
            )}
            <div className='timetexttime'>
              {moment(props.task.taskDate).format('hh:mm a')}
            </div>
          </div>
        ) : shouldShowAll ||
          !(
            moment(currentViewDateEnd).diff(
              moment(currentViewDateStart),
              'days'
            ) == 1
          ) ? (
          <div className='time'>
            {' '}
            <div className='timetext'>
              {moment(props.task.taskDate).format('MMM Do YYYY  ')}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default TaskRow
