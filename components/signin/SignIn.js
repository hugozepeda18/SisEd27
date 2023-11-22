'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '../utils/Logo';
import axios from 'axios';
import { useRouter } from 'next/router'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
        A Group 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {

  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('email') !== '' && data.get('password') !== '') {
      let res = await axios({
          method: 'post',
          url: process.env.NEXT_PUBLIC_URL_BASE_SERVICE + '/user/login',
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            email: data.get('email'),
            password: data.get('password'),
          }
        }).catch((error) => {
          if (error.response) {
            if (error.response.status === 404) {
              alert('Usuario no existe!')
            }
            if (error.response.status === 401) {
              alert('Usuario correcto, contraseña incorrecta!')
            }
          }
        })
      if (res) {
        if (res.status === 201) {
          router.push('/landing');
        }
      }
    } else {
      alert('Ingrese un correo electrónico y una contraseña válidos')
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Logo height='200' width='200' image='logo-sin-fondo.png'/>
          <Typography component="h5" variant="h5" fontWeight="medium">
            Sistematización Educativa Sec. 27
          </Typography>
          <Typography component="h1" variant="h5" fontWeight="bold">
            SisEd 27
          </Typography>
          <Typography component="h4" variant="h5" marginTop={3}>
            Iniciar Sesión
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/reset" variant="body2">
                  Olvidó su contraseña?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}