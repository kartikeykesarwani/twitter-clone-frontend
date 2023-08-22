import React, { useState, useContext } from 'react';
import { TextField, Button, Grid, Container } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateTweet = ({ authToken }) => {
  const [tweetText, setTweetText] = useState('');
  const AuthValue = useContext(AuthContext);
  const navigate = useNavigate();
  const handlePostTweet = async () => {
    try {
      const response = await axios
        .post(
          'https://twitter-clone-backend-production-c784.up.railway.app/tweet',
          { description: tweetText },
          {
            headers: {
              Authorization: `Bearer ${AuthValue.token}`,
            },
          }
        )
        .then((res) => {
          navigate('/MyTweets');
        });
      console.log('Tweet posted:', response.data);
    } catch (error) {
      console.error('Error posting tweet:', error);
    }
  };

  return (
    <Container
      component='main'
      maxWidth='xs'
      sx={{ position: 'relative', top: '25px' }}>
      <TextField
        label='Tweet'
        variant='outlined'
        fullWidth
        multiline
        rows={4}
        value={tweetText}
        onChange={(e) => setTweetText(e.target.value)}
      />
      <Grid container justifyContent='flex-end' style={{ marginTop: '16px' }}>
        <Button variant='contained' color='primary' onClick={handlePostTweet}>
          Post
        </Button>
      </Grid>
    </Container>
  );
};

export default CreateTweet;
