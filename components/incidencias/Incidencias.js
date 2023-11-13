import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Navbar from '../navbar/Navbar';
import CrearIncidencias from './CrearIncidencias';
import Filtro from '../filtro/Filtro';

const defaultTheme = createTheme();

export default function Incidencias() {

    return (
        <>
            {
                localStorage.getItem('jwt') ? (
                    <ThemeProvider theme={defaultTheme}>
                        <Navbar />
                        <Box sx={{ flexGrow: 1, marginTop: 5 }}> 
                            <Filtro/>
                        </Box>
                        <Box sx={{ flexGrow: 1, marginTop: 5 }}> 
                            <CrearIncidencias />
                        </Box>
                    </ThemeProvider>
                ) : (
                    window.location.replace('/')
                )
            }
        </>
    )
}