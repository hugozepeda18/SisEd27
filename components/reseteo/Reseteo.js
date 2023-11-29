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
import { useRouter } from 'next/router'
import { setCookie } from 'cookies-next';

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

export default function Reseteo() {

  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('email') !== '') {
      let res = await axios({
          method: 'get',
          url: process.env.NEXT_PUBLIC_URL_BASE_SERVICE + '/user/email',
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            email: data.get('email'),
          }
        });
      if (res.status === 200) {
        setCookie('user', res.data.id)
        router.push('/reset/contrasena')
      } else {
        alert('Sucedió un error, inténtelo de nuevo')
      }
    } else {
      alert('Ingrese un correo electrónico válido')
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
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
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