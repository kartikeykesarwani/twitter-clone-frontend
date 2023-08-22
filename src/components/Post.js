import * as React from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import CardContent from '@mui/material/CardContent';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { deepPurple } from '@mui/material/colors';

export default function Post({ description, username, time }) {
  return (
    <Card sx={{ width: '90%', margin: '20px' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: deepPurple[500] }} aria-label='recipe'>
            {username.charAt(0)}
          </Avatar>
        }
        title={username}
        subheader={time}
      />

      <CardContent sx={{ height: '100px', marginTop: '15px' }}>
        <Typography variant='body1' color='text.primary'>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
