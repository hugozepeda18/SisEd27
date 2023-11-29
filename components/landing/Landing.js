'use client'

import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Bienvenida from '../bienvenida/Bienvenida';
import Navbar from '../navbar/Navbar';
import NavBarLanding from '../navbar/NavbarLanding';
import { useSession } from 'next-auth/react'

const defaultTheme = createTheme();

export default function Landing() {

    const { data } = useSession()
    console.log('culos' + data)

    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                    {
                        data?.user?.token ? <Navbar /> : <NavBarLanding/>
                    }
                    <Box sx={{ flexGrow: 1, marginTop: 5 }}> 
                        <Bienvenida/>
                    </Box>
            </ThemeProvider>
        </>
    )
}