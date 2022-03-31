import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { auth, sendPasswordReset } from '../../config/firebase';
import './style.css';

import { Paper, TextField, Button, Typography } from '@mui/material';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const paperStyle = {
    padding: 20,
    height: 'auto',
    width: 280,
    margin: '50px auto',
  };
  const btnstyle = { margin: '8px 0', minHeight: 50 };
  const txtStyle = { margin: '8px 0' };
  const typographyStyle = { margin: '8px 0' };

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/dashboard');
  }, [user, loading, navigate]);

  return (
    <Paper elevation={10} style={paperStyle} direction="column">
      <TextField
        label="Email"
        placeholder="Enter Email"
        fullWidth
        style={txtStyle}
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        size="medium"
        style={btnstyle}
        fullWidth
        onClick={() => sendPasswordReset(email)}
      >
        Send password reset email
      </Button>
      <Typography
        style={typographyStyle}
        align="center"
        variant="caption"
        display="block"
      >
        Don't have an account? <Link to="/register">Register</Link> Now
      </Typography>
    </Paper>
  );
};

export default Reset;
