import { React, useContext, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const User = ({
  name,
  email,
  followersCount,
  followingCount,
  id,
  follower,
}) => {
  const AuthValue = useContext(AuthContext);
  const val = follower.includes(AuthValue.id);
  const [isFollowing, setIsFollowing] = useState(val);

  const onFollowToggle = () => {
    if (isFollowing) {
      axios
        .put(
          `https://twitter-clone-backend-production-c784.up.railway.app/unfollow/${id}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${AuthValue.token}`,
            },
          }
        )
        .then((response) => {
          setIsFollowing(false);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
        });
    } else {
      axios
        .put(
          `https://twitter-clone-backend-production-c784.up.railway.app/follow/${id}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${AuthValue.token}`,
            },
          }
        )
        .then((response) => {
          setIsFollowing(true);
        });
    }
  };
  return (
    <Card variant='outlined' sx={{ margin: '10px' }}>
      <CardContent>
        <Typography variant='h6'>{name}</Typography>
        <Typography variant='subtitle1'>{email}</Typography>
        <div style={{ marginTop: '10px' }}>
          <Typography variant='body2'>Followers: {followersCount}</Typography>
          <Typography variant='body2'>Following: {followingCount}</Typography>
        </div>
        <Grid container justifyContent='flex-end'>
          <Button
            variant={isFollowing ? 'outlined' : 'contained'}
            color='primary'
            onClick={() => onFollowToggle(!isFollowing)}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default User;
