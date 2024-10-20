import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import axios from 'axios';
import AppBar from '../components/AppBar';
import { useNavigate } from 'react-router-dom';
import useAllStore from '../utils/store';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

const SignUpForm = () => {
  const [mode, setMode] = React.useState('light');
  const [firstNameError, setFirstNameError] = React.useState('');
  const [surnameError, setSurnameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const navigate = useNavigate();
  const setAuthToken = useAllStore((state) => state.setAuthToken);
  const setLoggedIn = useAllStore((state) => state.setLoggedIn);

  React.useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setMode(savedMode);
    } else {
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Reset error messages
    setFirstNameError('');
    setSurnameError('');
    setEmailError('');
    setPasswordError('');

    // Validation
    let valid = true;

    if (!data.get('first_name')) {
      setFirstNameError('First Name is required');
      valid = false;
    }
    if (!data.get('surname')) {
      setSurnameError('Surname is required');
      valid = false;
    }
    const email = data.get('email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email Address is required');
      valid = false;
    } else if (!emailPattern.test(email)) {
      setEmailError('Enter a valid email address');
      valid = false;
    }
    const password = data.get('password');
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      valid = false;
    }

    if (!valid) return; // Stop if validation fails

    axios
      .post('http://localhost:80/INFO_project-main/Server/models/UserModal.php', {
        method: 'register',
        first_name: data.get('first_name'),
        last_name: data.get('surname'),
        email: data.get('email'),
        password: data.get('password'),
      })
      .then((response) => {
        if (response.data.error) {
          console.error(response.data.error);
          return;
        }
        return axios.post('http://localhost:80/INFO_project-main/Server/models/UserModal.php', {
          method: 'login',
          email: data.get('email'),
          password: data.get('password'),
        });
      })
      .then((loginResponse) => {
        if (loginResponse.data.error) {
          console.error(loginResponse.data.error);
          return;
        }
        setAuthToken(loginResponse.data.auth_token);
        setLoggedIn(true);
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <AppBar />
      <ThemeProvider theme={createTheme({ palette: { mode } })}>
        <CssBaseline enableColorScheme />
        <SignUpContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
              Sign Up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
              }}
            >
              <TextField
                id="first_name"
                label="First Name"
                name="first_name"
                required
                fullWidth
                variant="outlined"
                error={!!firstNameError}
                helperText={firstNameError}
              />
              <TextField
                id="surname"
                label="Surname"
                name="surname"
                required
                fullWidth
                variant="outlined"
                error={!!surnameError}
                helperText={surnameError}
              />
              <TextField
                id="email"
                label="Email Address"
                name="email"
                required
                fullWidth
                type="email"
                variant="outlined"
                error={!!emailError}
                helperText={emailError}
              />
              <TextField
                id="password"
                label="Password"
                name="password"
                required
                fullWidth
                type="password"
                variant="outlined"
                error={!!passwordError}
                helperText={passwordError}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
              >
                Sign Up
              </Button>
              <Typography sx={{ textAlign: 'center' }}>
                Already have an account?{' '}
                <Link href="/login" variant="body2">
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Card>
        </SignUpContainer>
      </ThemeProvider>
    </div>
  );
};

export default SignUpForm;
