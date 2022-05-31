import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteLog } from '../../features/logger/loggerSlice'
import './LogCard.css'

function LogCard(props) {
 const dispatch = useDispatch()
  return (
    <div
      className='logcard'
      onClick={() => dispatch(deleteLog({ id: props.logid }))}
    >
      LogCard
    </div>
  )
}

export default LogCard