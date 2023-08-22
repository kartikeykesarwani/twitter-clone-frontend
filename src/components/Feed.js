import * as React from 'react';
import axios from 'axios';
import { useState, useContext } from 'react';

import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';

import { AuthContext } from '../context/AuthContext';
import Post from './Post';
import Layout from './Layout';

import { Typography } from '@mui/material';

export default function Feed() {
  const [posts, setPosts] = useState([]);

  const AuthValue = useContext(AuthContext);
  React.useEffect(() => {
    axios
      .get(
        'https://twitter-clone-backend-production-c784.up.railway.app/timeline',
        {
          headers: {
            Authorization: `Bearer ${AuthValue.token}`,
          },
        }
      )
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log('Error fetching posts:', error);
      });
  }, [AuthValue.token]);
  return (
    <Box sx={{ display: 'flex' }}>
      <Layout />
      <Box
        component='main'
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        {posts.length > 0 ? (
          posts.map((post, index) => {
            return (
              <Post
                key={index}
                description={post.description}
                username={post.owner.username}
                time={post.createdAt}
              />
            );
          })
        ) : (
          <Typography>
            Please Follow Some Users to see feed. If already followed, the feed
            is loading...!
          </Typography>
        )}
      </Box>
    </Box>
  );
}
