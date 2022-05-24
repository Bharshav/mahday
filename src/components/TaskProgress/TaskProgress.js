import React, { useState } from 'react'
import './TaskProgress.css'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

function TaskProgress() {
  const [progress, setProgress] = useState(50)
  return (
    <div className='mdprogress'>
      <div className='mdprogressbar'>
        
      </div>
    </div>
  )
}

export default TaskProgress
