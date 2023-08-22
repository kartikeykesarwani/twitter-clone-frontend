import { React, useState, useContext } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function MyTweet({ id, description }) {
  const [editContent, setEditContent] = useState(description);
  const [editMode, setEditMode] = useState(false);
  const [tweetDescription, setTweetDescription] = useState(description);
  const [display, setDisplay] = useState(true);
  const AuthValue = useContext(AuthContext);
  const onEdit = () => {
    setEditMode(true);
  };
  const onDelete = (id) => {
    axios
      .delete(
        `https://twitter-clone-backend-production-c784.up.railway.app/tweet/${id}`,
        {
          headers: {
            Authorization: `Bearer ${AuthValue.token}`,
          },
        }
      )
      .then((res) => {
        setDisplay(false);
      })
      .catch((e) => {});
  };
  const handleEditTweet = () => {
    axios
      .patch(
        `https://twitter-clone-backend-production-c784.up.railway.app/tweet/${id}`,
        {
          description: editContent,
        },
        {
          headers: {
            Authorization: `Bearer ${AuthValue.token}`,
          },
        }
      )
      .then((res) => {
        setEditMode(false);
        setTweetDescription(editContent);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {display ? (
        <Card key={id} variant='outlined' style={{ marginBottom: '16px' }}>
          {editMode ? (
            <CardContent>
              <TextField
                label='Tweet'
                variant='outlined'
                fullWidth
                multiline
                rows={4}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <Grid
                container
                justifyContent='flex-end'
                style={{ marginTop: '16px' }}>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleEditTweet}>
                  Save
                </Button>
              </Grid>
            </CardContent>
          ) : (
            <CardContent>
              <Typography variant='body1'>{tweetDescription}</Typography>
              <Grid container justifyContent='flex-end'>
                <Button color='primary' onClick={() => onEdit(id)}>
                  Edit
                </Button>
                <Button color='secondary' onClick={() => onDelete(id)}>
                  Delete
                </Button>
              </Grid>
            </CardContent>
          )}
        </Card>
      ) : null}
    </div>
  );
}

export default MyTweet;
