import React from 'react'
import './TaskRow.css'
import DoneIcon from '@mui/icons-material/Done'
import DangerousIcon from '@mui/icons-material/Dangerous'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import SaveIcon from '@mui/icons-material/Save'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setEditable } from '../../features/tasks/taskSlice'
function TaskRow(props) {
  let description = props.data
  const dispatch = useDispatch()
  return (
    <div className='taskrow' key={props.tid}>
      <div className='description'>{description}</div>
      <div className='actions'>
        <Button variant='contained' className='actionbutton' color='success'>
          <DoneIcon style={{ color: 'white' }}  />
        </Button>
        <Button variant='contained' className='actionbutton' color='error'>
          <DangerousIcon style={{ color: 'white' }}  />
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
            <ModeEditIcon style={{ color: 'white' }}  />
          ) : (
            <SaveIcon style={{ color: 'white' }}  />
          )}
        </Button>
      </div>
    </div>
  )
}

export default TaskRow
