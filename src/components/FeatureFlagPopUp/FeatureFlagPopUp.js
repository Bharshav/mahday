import './FeatureFlagPopUp.css'
import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import FlagIcon from '@mui/icons-material/Flag'
import { IconButton } from '@mui/material'
import { FeatureFlags } from '../../features/featureflags/featureFlagSlice'
import {
  enableFeatureFlag,
  disableFeatureFlag,
} from '../../features/featureflags/featureFlagSlice'
import { Switch } from 'antd'
import { useDispatch,useSelector } from 'react-redux'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function FeatureFlagPopUp() {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false)
  const featureFlags = useSelector(store => store.featureFlag)

  const onChange = (flag, checked) => {
    if (checked) {
      dispatch(enableFeatureFlag({ featureFlag: FeatureFlags[flag] }))
    } else {
      dispatch(disableFeatureFlag({ featureFlag: FeatureFlags[flag] }))
    }
  }
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <div className='featureFlag'>
        <IconButton
          onClick={handleClickOpen}
          size='large'
          edge='start'
          color='inherit'
        >
          <FlagIcon />
        </IconButton>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{'Feature flags:'}</DialogTitle>
        <DialogContent className='ffdialogcontent'>
          {Object.keys(FeatureFlags).map((flag) => (
            <div className='featureFlags' key={FeatureFlags[flag]}>
              <div className='featureFlagName'>{flag}</div>
              <Switch
                checked = {featureFlags[FeatureFlags[flag]]}
                onChange={(checked) => onChange(flag, checked)}
              />
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
