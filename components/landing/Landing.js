'use client'

import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Bienvenida from '../bienvenida/Bienvenida';
import Navbar from '../navbar/Navbar';

const defaultTheme = createTheme();

export default function Landing() {

    const [key, setKey] = React.useState(undefined)

    React.useEffect(() => {
        setKey(localStorage.getItem('jwt'))
    }, [])

    return (
        <>        
            {
                key ? (
                    <ThemeProvider theme={defaultTheme}>
                            <Navbar />
                            <Box sx={{ flexGrow: 1, marginTop: 5 }}> 
                                <Bienvenida/>
                            </Box>
                    </ThemeProvider> 
                ) : (
                    typeof window !== 'undefined' && window.location.replace('/')
                )
            }
        </>
    )
}