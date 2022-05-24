import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import Popover from '@mui/material/Popover'
import { useDispatch, useSelector } from 'react-redux'
import {
  modifyViewDate,
  reset,
  showAll,
} from '../../features/calendar/calendarSlice'
import { DatePicker, Space } from 'antd'
import { modifySearchTerm } from '../../features/search/searchSlice'
import moment from 'moment'
import FeatureFlagPopUp from '../FeatureFlagPopUp/FeatureFlagPopUp'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import './AppHeader.css'
const { RangePicker } = DatePicker

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

export default function AppHeader() {
  const [startDate, setStartDate] = React.useState(new Date())
  const dispatch = useDispatch()
  const { currentViewDateStart, currentViewDateEnd, shouldShowAll } =
    useSelector((state) => state.calendar)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const [filter, setFilter] = React.useState(
    shouldShowAll ? 'showall' : 'filter'
  )
  React.useEffect(() => {
    dispatch(
      modifyViewDate({
        newDateStart: new Date().toJSON(),
        newDateEnd: new Date().toJSON(),
      })
    )
  }, [])
  const handleChangeOfFilter = (event, newval) => {
    if (newval != null) {
      setFilter((val) => newval)
      if (newval === 'filter') {
        dispatch(showAll({ showAll: false }))
      } else {
        dispatch(showAll({ showAll: true }))
      }
    }
  }
  const showFeatureFlagPopUp = ()=>{

  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  return (
    <div style={{ height: '10vh' }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              onClick={handleClick}
              size='large'
              edge='start'
              color='inherit'
              aria-label='open drawer'
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Typography sx={{ p: 2 }}>This is WIP buddy.</Typography>
            </Popover>
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              MahDay
            </Typography>
            <ToggleButtonGroup
              style={{ marginRight: '10px' }}
              color='info'
              size='small'
              value={filter}
              exclusive={true}
              onChange={handleChangeOfFilter}
            >
              <ToggleButton color='info' value='showall'>
                Show all
              </ToggleButton>
              <ToggleButton color='info' value='filter'>
                Filter by Range
              </ToggleButton>
            </ToggleButtonGroup>
            <RangePicker
              defaultValue={[moment(new Date()), moment(new Date())]}
              onCalendarChange={(e) =>
                dispatch(
                  modifyViewDate({
                    newDateStart: e[0].toJSON(),
                    newDateEnd: e[1] ? e[1].toJSON() : new Date().toJSON(),
                  })
                )
              }
            />

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder='Search…'
                onChange={(e) => {
                  dispatch(modifySearchTerm({ searchTerm: e.target.value }))
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <FeatureFlagPopUp/>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}
