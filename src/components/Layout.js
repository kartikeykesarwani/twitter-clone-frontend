import * as React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import Button from '@mui/material/Button';
import { AuthContext } from '../context/AuthContext';

import SvgIcon from '@mui/material/SvgIcon';
const drawerWidth = 240;

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
    </SvgIcon>
  );
}
function Layout() {
  const AuthValue = useContext(AuthContext);
  return (
    <div>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            Twitter
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='permanent'
        anchor='left'>
        <Toolbar />
        <Divider />
        <List>
          <Link to='/Feed'>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary='Feed' />
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          <Link to='/Users'>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PeopleAltIcon />
                </ListItemIcon>
                <ListItemText primary='Users' />
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary='Logout'
                onClick={() => AuthValue.logout()}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <Link to='/MyTweets'>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HistoryEduIcon />
                </ListItemIcon>
                <ListItemText primary='My Tweets' />
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          <Link to='/Tweet'>
            <ListItem disablePadding>
              <Button
                size='large'
                variant='contained'
                sx={{
                  postion: 'relative',
                  width: '80%',
                  left: '10%',
                  top: '25px',
                }}>
                Tweet
              </Button>
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </div>
  );
}

export default Layout;
