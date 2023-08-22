import * as React from 'react';
import axios from 'axios';
import { useState, useContext } from 'react';

import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';

import { AuthContext } from '../context/AuthContext';

import User from './User';
import Layout from './Layout';

export default function Feed() {
  const [users, setUsers] = useState([]);
  const AuthValue = useContext(AuthContext);
  React.useEffect(() => {
    axios
      .get(
        'https://twitter-clone-backend-production-c784.up.railway.app/users',
        {
          headers: {
            Authorization: `Bearer ${AuthValue.token}`,
          },
        }
      )
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, [AuthValue.token]);
  return (
    <Box sx={{ display: 'flex' }}>
      <Layout />
      <Box
        component='main'
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        {users.map((user, index) => {
          return (
            <User
              key={index}
              name={user.username}
              email={user.email}
              followersCount={user.followers.length}
              followingCount={user.following.length}
              id={user._id}
              follower={user.followers}
              following={user.following}
            />
          );
        })}
      </Box>
    </Box>
  );
}
