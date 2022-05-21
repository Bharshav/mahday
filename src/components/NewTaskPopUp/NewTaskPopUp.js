import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Input from '@mui/material/Input'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useDispatch } from 'react-redux'
import AddIcon from '@mui/icons-material/Add'
import { addTask } from '../../features/tasks/taskSlice'

export default function NewTaskPopUp(props) {
  const [open, setOpen] = React.useState(false)
  const [description, setDescription] = React.useState('')
  const [date, setDate] = React.useState(new Date())
  const dispatch = useDispatch()
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (data) => {
    setOpen(false);
    if(data.isTaskAdded){

     dispatch(
       addTask({
         description: data.description,
         completed: false,
         type: props.taskType == 'time based'?'timebased':'taskbased',
         typeprops: {
           title: 'this is test',
         },
         taskDate: date, //This can be bought from popup later
       })
     )
    }
        
  }

  return (
    <div>
      <Button
        variant='contained'
        className='addaction'
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Button>

      <Dialog maxWidth='md' fullWidth='true' open={open} onClose={handleClose}>
        <DialogTitle>Add a {props.taskType} task</DialogTitle>
        <DialogContent>
          <TextField
            id='outlined-multiline-flexible fullWidth'
            label='Task description'
            fullWidth={true}
            margin='normal'
            multiline
            maxRows={4}
            value={description}
            onChange={(event)=>{setDescription(event.target.value)}}
          />
          <div className="taskdate">
           Task Date:
          <Input style={{marginLeft:'10px'}} onChange={(e)=>setDate(e.target.value)} placeholder="Enter task date" type={props.taskType=='time based'?'datetime-local':'date'} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose({isTaskAdded:false})}>Cancel</Button>
          <Button onClick={()=>handleClose({isTaskAdded:true,description,date})}>Add Task</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
