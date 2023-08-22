import * as React from 'react';
import axios from 'axios';
import { useState, useContext } from 'react';

import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';

import { AuthContext } from '../context/AuthContext';
import MyTweet from './MyTweet';
import Layout from './Layout';

export default function MyTweets() {
  const [tweets, setTweets] = useState([]);
  const [editRerender, setEditRerender] = useState(false);
  const AuthValue = useContext(AuthContext);
  React.useEffect(() => {
    axios
      .get(
        'https://twitter-clone-backend-production-c784.up.railway.app/my-tweets',
        {
          headers: {
            Authorization: `Bearer ${AuthValue.token}`,
          },
        }
      )
      .then((response) => {
        setTweets(response.data);
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
        {tweets.map((tweet, index) => {
          return (
            <MyTweet
              key={index}
              description={tweet.description}
              id={tweet._id}
              editRerender={editRerender}
              setEditRerender={setEditRerender}
            />
          );
        })}
      </Box>
    </Box>
  );
}
