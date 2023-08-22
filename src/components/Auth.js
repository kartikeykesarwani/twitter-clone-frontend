import React, { useState, useContext } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Alert,
} from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wrongCredentials, setWrongCredentials] = useState(false);

  const handleSwitchAction = () => {
    console.log('working');
    setIsSignUp(!isSignUp);
  };
  const AuthValue = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (isSignUp) {
      try {
        const response = await axios.post(
          'https://twitter-clone-backend-production-c784.up.railway.app/users',
          {
            username,
            email,
            password,
          }
        );
        AuthValue.login(response.data.token, response.data.user._id);

        navigate('/Feed');
        console.log('Sign up successful:', response.data);
      } catch (error) {
        console.error('Sign up failed:', error.message);
      }
    } else {
      try {
        const response = await axios.post(
          'https://twitter-clone-backend-production-c784.up.railway.app/users/login',
          {
            email,
            password,
          }
        );

        AuthValue.login(response.data.token, response.data.user._id);

        setWrongCredentials(false);

        navigate('/Feed');
        console.log('Sign in successful:', response.data);
      } catch (error) {
        setWrongCredentials(true);
        console.error('Sign in failed:', error.message);
      }
    }
  };

  return (
    <Container
      component='main'
      maxWidth='xs'
      sx={{
        height: '100vh',
      }}>
      <Paper
        elevation={3}
        sx={{ padding: 3, height: '355px', position: 'relative', top: '25vh' }}>
        <Typography variant='h5' sx={{ textAlign: 'center' }}>
          {'Welcome to Twitter'}
        </Typography>
        {wrongCredentials ? (
          <Alert severity='error'>Please check your credentials !</Alert>
        ) : null}

        <form onSubmit={handleSubmit}>
          {isSignUp ? (
            <TextField
              label='Username'
              variant='outlined'
              margin='normal'
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          ) : null}
          <TextField
            label='Email'
            variant='outlined'
            margin='normal'
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label='Password'
            variant='outlined'
            margin='normal'
            type='password'
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            onClick={handleSubmit}
            variant='contained'
            color='primary'
            fullWidth>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>
        <Grid container justifyContent='center'>
          <Grid item>
            <Typography
              onClick={handleSwitchAction}
              sx={{ cursor: 'pointer', marginTop: '2px' }}>
              {isSignUp
                ? 'Already have an account? Sign In'
                : "Don't have an account? Sign Up"}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Auth;
