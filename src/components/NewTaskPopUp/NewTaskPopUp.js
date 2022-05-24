import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Input from '@mui/material/Input'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add'
import { addTask } from '../../features/tasks/taskSlice'
import { DatePicker } from 'antd'
import moment from 'moment'
import addedAudio from '../../notifications/Added.mp3'
import { FeatureFlags } from '../../features/featureflags/featureFlagSlice'

export default function NewTaskPopUp(props) {
  const featureFlags = useSelector((store) => store.featureFlag)
  const [open, setOpen] = React.useState(false)
  const [description, setDescription] = React.useState('')
  const [date, setDate] = React.useState(new Date())
  const dispatch = useDispatch()
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (data) => {
    setOpen(false)
    if (data.isTaskAdded) {
      dispatch(
        addTask({
          description: data.description,
          completed: false,
          type: props.taskType == 'time based' ? 'timebased' : 'taskbased',
          typeprops: {
            title: 'this is test',
          },
          taskDate: date.toJSON(), //This can be bought from popup later
        })
      )
      if(featureFlags[FeatureFlags.PLAYSOUND]){
        new Audio(addedAudio).play()
      }
    }
    setDescription((state) => '')
    setDate((state) => new Date())
  }

  return (
    <div>
      <Button
        variant='contained'
        className='addaction'
        onClick={handleClickOpen}
        style={{ backgroundColor: '#fff' }}
      >
        <AddIcon style={{ color: 'grey', fontSize: '25px' }} />
      </Button>

      <Dialog maxWidth='md' fullWidth={true} open={open} onClose={handleClose}>
        <DialogTitle>Add a {props.taskType} task</DialogTitle>
        <DialogContent>
          <TextField
            id='outlined-multiline-flexible fullWidth'
            label='Task description'
            fullWidth={true}
            margin='normal'
            multiline
            autoFocus={true} //not working
            maxRows={4}
            value={description}
            onChange={(event) => {
              setDescription(event.target.value)
            }}
          />
          <div className='taskdate'>
            Task Date:
            <Input
              style={{ marginLeft: '10px' }}
              onChange={(e) => setDate(new Date(e.target.value))}
              placeholder='Enter task date'
              type={props.taskType == 'time based' ? 'datetime-local' : 'date'}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose({ isTaskAdded: false })}>
            Cancel
          </Button>
          <Button
            onClick={() =>
              handleClose({ isTaskAdded: true, description, date })
            }
          >
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
