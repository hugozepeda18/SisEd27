'use client'

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Logo from '../utils/Logo';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from "next/link";
import * as React from 'react';
import { signIn } from 'next-auth/react';

const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
}));

export default function NavBarLanding() {

    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" display="inline-block" >
                <Toolbar>
                    <Link href="/landing">
                        <Logo height='50' width='50' image='logo-sin-fondo.png'/>
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />
                    <Stack spacing={50} direction="row" alignContent="end" >
                        <ColorButton variant="contained" onClick={() => signIn()}>
                            <LogoutIcon />
                            Entrar
                        </ColorButton>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    )
}