'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '../utils/Logo';
import axios from 'axios';
import { getCookie, deleteCookie } from 'cookies-next';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
        Double A Group 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function NuevaContrasena() {

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('password') !== '' &&
        data.get('password-confirm') !== '' &&
        data.get('password') === data.get('password-confirm')) {
      let res = await axios({
          method: 'put',
          url: process.env.NEXT_PUBLIC_URL_BASE_SERVICE + '/user/password',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          data: {
            id: getCookie('user'),
            password: data.get('password'),
          }
        });
      if (res.status === 200) {
        deleteCookie('user')
        alert('Contraseña actualizada correctamente')
        typeof window !== 'undefined' && window.location.replace('/')
      } else {
        alert('Sucedió un error, inténtelo de nuevo')
      }
    } else {
      alert('No deje vacío ningún campo, e ingrese la misma contraseña en ambos campos')
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Logo height='200' width='200' image='logo-sin-fondo.png'/>
          <Typography component="h1" variant="h5">
            Recuperando contraseña
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Nueva Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password-confirm"
              label="Confirmar Nueva Contraseña"
              type="password"
              id="password-confirm"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reestablecer contraseña
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}