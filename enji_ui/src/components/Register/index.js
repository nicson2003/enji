import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '../../config/firebase';
import './style.css';

import {
  Grid,
  Paper,
  TextField,
  Avatar,
  Button,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';

import { FcGoogle } from 'react-icons/fc';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { FacebookRounded } from '@mui/icons-material';

const Register = () => {
  const paperStyle = {
    padding: 20,
    //height: 'auto',
    width: 280,
    margin: '50px auto',
  };
  const avatarStyle = { backgroundColor: '#1976d2', fontSize: 16 };
  const btnstyle = { margin: '8px 0', height: 50 };
  const txtStyle = { margin: '8px 0' };
  const dividerStyle = { margin: '8px 0' };
  const typographyStyle = { margin: '8px 0' };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if (!name) alert('Please enter name');
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/dashboard');
  }, [user, loading, navigate]);

  return (
    <Paper elevation={10} style={paperStyle} direction="column">
      <Grid align="center">
        <Avatar style={avatarStyle}></Avatar>
      </Grid>
      <TextField
        label="Full Name"
        placeholder="Full Name"
        type="text"
        fullWidth
        style={txtStyle}
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Email Address"
        placeholder="Email Address"
        type="email"
        fullWidth
        style={txtStyle}
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        placeholder="Password"
        type="password"
        fullWidth
        style={txtStyle}
        required
        value={email}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        style={btnstyle}
        fullWidth
        onClick={register}
      >
        Register
      </Button>
      <Divider style={dividerStyle}>Or Register with</Divider>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <IconButton
          aria-label="sign-in-with-facebook"
          type="submit"
          style={btnstyle}
          size="large"
          onClick={signInWithGoogle}
        >
          <FacebookRounded fontSize="inherit" style={{ color: '#4267B2' }} />
        </IconButton>
        <IconButton
          aria-label="sign-in-with-twitter"
          type="submit"
          style={btnstyle}
          size="large"
          onClick={signInWithGoogle}
        >
          <AiFillTwitterCircle
            fontSize="inherit"
            style={{ color: '#0084b4' }}
          />
        </IconButton>
        <IconButton
          aria-label="sign-in-with-google"
          type="submit"
          style={btnstyle}
          size="large"
          onClick={signInWithGoogle}
        >
          <FcGoogle fontSize="inherit" />
        </IconButton>
      </Grid>
      <Typography
        style={typographyStyle}
        align="center"
        variant="caption"
        display="block"
      >
        Already have an account? <Link to="/">Login</Link> now.
      </Typography>
    </Paper>
  );
};

export default Register;
