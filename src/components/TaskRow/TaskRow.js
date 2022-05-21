import React, { useState } from 'react'
import './TaskRow.css'
import DoneIcon from '@mui/icons-material/Done'
import DangerousIcon from '@mui/icons-material/Dangerous'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import SaveIcon from '@mui/icons-material/Save'
import { Button, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setEditable, markAsCompleted } from '../../features/tasks/taskSlice'
function TaskRow(props) {
  const [description, setDescription] = useState(props.data)
  const dispatch = useDispatch()
  const handleChange = (event) => {
    setDescription(event.target.value)
  }
  return (
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
                completeStatus: true,
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
              markAsCompleted({
                id: props.tid,
                completeStatus: false,
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
      </div>
    </div>
  )
}

export default TaskRow
