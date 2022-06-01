import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteLog, updateLog } from '../../features/logger/loggerSlice'
import './LogCard.css'
import { TimePicker } from 'antd'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { Input } from 'antd'
import moment from 'moment'
const { TextArea } = Input

function LogCard(props) {
  const dispatch = useDispatch()
  const onTimeChange = (time, timestring) => {
    dispatch(
      updateLog({
        id: props.log.id,
        startdatetime: time[0].toJSON(),
        enddatetime: time[1].toJSON(),
        description: props.log.description,
      })
    )
  }
  return (
    <div className='logcard'>
      <TimePicker.RangePicker
        defaultValue={[
          moment(props.log.startdatetime),
          moment(props.log.enddatetime),
        ]}
        format={'HH:mm'}
        onChange={onTimeChange}
      />
      <TextArea
        className='whatidid'
        value={props.log.description}
        onChange={(e) => dispatch(updateLog({id:props.log.id, description: e.target.value }))}
        placeholder={`What were you doing from ${moment(
          props.log.startdatetime
        ).format('HH:mm')} to ${moment(props.log.enddatetime).format('HH:mm')}`}
      />
      <div className='delete'>
        <IconButton
          onClick={() => dispatch(deleteLog({ id: props.log.id }))}
          style={{ color: 'red' }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default LogCard
