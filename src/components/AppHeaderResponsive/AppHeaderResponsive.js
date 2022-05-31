import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { styled, alpha } from '@mui/material/styles'
import AdbIcon from '@mui/icons-material/Adb'
import './AppHeaderResponsive.css'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import Popover from '@mui/material/Popover'
import HarshaAvatar from '../../assets/avatar.jpg'
import {pages} from '../../store/constants'
import { useDispatch, useSelector } from 'react-redux'

import { Avatar, Image } from 'antd'
import {
  modifyViewDate,
  reset,
  showAll,
} from '../../features/calendar/calendarSlice'
import { DatePicker, Space } from 'antd'
import { modifySearchTerm } from '../../features/search/searchSlice'
import { setPage } from '../../features/pagenav/pagenavSlice'
import moment from 'moment'
import FeatureFlagPopUp from '../FeatureFlagPopUp/FeatureFlagPopUp'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import './AppHeaderResponsive.css'

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
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

const AppHeaderResponsive = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = (e) => {
      console.log(e)
      dispatch(setPage({page:e}))
     //todo:modify logic later


    
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const [startDate, setStartDate] = React.useState(new Date())
  const dispatch = useDispatch()
  const { currentViewDateStart, currentViewDateEnd, shouldShowAll } =
    useSelector((state) => state.calendar)
  const {currentPage} = useSelector(state=>state.pagenav)
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
  const showFeatureFlagPopUp = () => {}

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MahDay
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu(currentPage)}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MahDay
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
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
          <FeatureFlagPopUp />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  src={
                    <Image
                      src={HarshaAvatar}
                      style={{ width: 32 }}
                    />
                  }
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign='center'>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default AppHeaderResponsive
