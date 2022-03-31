import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
  isAuthenticated,
} from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Login = () => {
  const paperStyle = {
    padding: 20,
    height: 'auto',
    width: 280,
    margin: '50px auto',
  };
  const avatarStyle = { backgroundColor: '#1976d2', fontSize: 16 };
  const btnstyle = { margin: '8px 0', minHeight: 50 };
  const txtStyle = { margin: '8px 0' };
  const dividerStyle = { margin: '8px 0' };
  const typographyStyle = { margin: '8px 0' };

  const [email, setEmail] = useState('user1');
  const [password, setPassword] = useState('user');
  const [user, loading] = useAuthState(auth);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/dashboard');
    if (isAuthenticated()) navigate('/dashboard');
  }, [user, loading, navigate]);

  useEffect(() => {
    if (isAuthenticated()) {
      setRefresh(false);
      navigate('/dashboard');
    }
  }, [refresh, navigate]);

  const onLogin = () => {
    setRefresh(true);
    logInWithEmailAndPassword(email, password);
  }

  return (
    <Paper elevation={10} style={paperStyle} direction="column">
      <Grid align="center">
        <Avatar style={avatarStyle}></Avatar>
      </Grid>

      <TextField
        label="Email"
        placeholder="Enter Email"
        fullWidth
        style={txtStyle}
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        placeholder="Enter password"
        type="password"
        style={txtStyle}
        fullWidth
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        size="large"
        style={btnstyle}
        fullWidth
        onClick={() => onLogin()}
      >
        Sign in
      </Button>
      <Divider style={dividerStyle}>Or Login with</Divider>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <IconButton
          aria-label="sign-in-with-facebook"
          type="submit"
          size="large"
          onClick={() => alert('Please try other login option')}
        >
          <FacebookRounded fontSize="inherit" style={{ color: '#4267B2' }} />
        </IconButton>
        <IconButton
          aria-label="sign-in-with-twitter"
          type="submit"
          size="large"
          onClick={() => alert('Please try other login option')}
        >
          <AiFillTwitterCircle
            fontSize="inherit"
            style={{ color: '#0084b4' }}
          />
        </IconButton>
        <IconButton
          aria-label="sign-in-with-google"
          type="submit"
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
        <Link to="/reset">Forgot Password?</Link>
      </Typography>
      <Typography
        style={typographyStyle}
        align="center"
        variant="overline"
        display="block"
      >
        <Link to="/register">Register now?</Link>
      </Typography>
    </Paper>
  );
};

export default Login;
