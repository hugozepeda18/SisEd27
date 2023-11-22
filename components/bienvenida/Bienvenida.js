
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '@/components/utils/Logo';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Bienvenida() {

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
          <Typography component="h1" variant="h5" align='center'>
            Bienvenid@ a SisEd 27 - Sistematización Educativa Secundaria 27; el comienzo a nuestro mundo virtual.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}