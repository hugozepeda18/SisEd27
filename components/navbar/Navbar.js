'use client'

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router'
import Logo from '../utils/Logo';
import BoyIcon from '@mui/icons-material/Boy';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ReportIcon from '@mui/icons-material/Report';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from "next/link";
import * as React from 'react';
import axios from 'axios';
import { deleteCookie } from 'cookies-next';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '60ch',
      },
    },
}));

const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
}));

export default function Navbar() {

    const [alumno, setAlumno] = React.useState('')
    const handleSetAlumno = (e) => setAlumno(e.target.value)

    const router = useRouter()

    const alumnosView = (event) => {
        event.preventDefault()
        router.push('/alumnos')
    }

    const asistenciaView = (event) => {
        event.preventDefault()
        router.push('/asistencia')
    }

    const incidenciasView = (event) => {
        event.preventDefault()
        router.push('/incidencias')
    }

    const logout = (event) => {
        event.preventDefault()
        deleteCookie('token')
        router.push('/')
    }

    const alumnoName = (event) => {
        event.preventDefault()
        handleSetAlumno(event)
    }

    const alumnoSearch = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            let res
            if(/\d/.test(alumno)){
                res = await axios({
                    method: 'get',
                    url: process.env.NEXT_PUBLIC_URL_BASE_SERVICE + '/alumnos/id?matricula=' + alumno,
                    headers: {
                      'Content-Type': 'application/json',
                    },                    
                }).catch((error) => {
                    if (error.response) {
                        if (error.response.status === 500) {
                            alert('No se encontró alumno con matrícula ' + alumno)
                        }
                    }
                })
            } else {
                const separateName = alumno.split(' ')
                if (separateName.length === 2) {
                    alert('Favor de escribir nombre completo')
                } else if (separateName.length === 3){
                    res = await axios({
                        method: 'get',
                        url: process.env.NEXT_PUBLIC_URL_BASE_SERVICE + '/alumnos/nombre?nombre=' + separateName[0] + '&apellido_paterno=' + separateName[1] + '&apellido_materno=' + separateName[2],
                        headers: {
                          'Content-Type': 'application/json',
                        },                    
                    }).catch((error) => {
                        if (error.response) {
                            if (error.response.status === 500) {
                                alert(`No se encontró alumno con ese nombre [${separateName[0]} ${separateName[1]} ${separateName[2]}], favor de volver a intentarlo`)
                            }
                        }
                    })
                } else if (separateName.length === 4) {
                    res = await axios({
                        method: 'get',
                        url: process.env.NEXT_PUBLIC_URL_BASE_SERVICE + '/alumnos/nombre?nombre=' + separateName[0] + ' ' + separateName[1] + '&apellido_paterno=' + separateName[2] + '&apellido_materno=' + separateName[3],
                        headers: {
                          'Content-Type': 'application/json',
                        },                    
                    }).catch((error) => {
                        if (error.response) {
                            if (error.response.status === 500) {
                                alert(`No se encontró alumno con ese nombre [${separateName[0]} ${separateName[1]} ${separateName[2]} ${separateName[3]}], favor de volver a intentarlo`)
                            }
                        }
                    })
                } else if (separateName.length === 5) {
                    res = await axios({
                        method: 'get',
                        url: process.env.NEXT_PUBLIC_URL_BASE_SERVICE + '/alumnos/nombre?nombre=' + separateName[0] + ' ' + separateName[1] + ' ' + separateName[2] + '&apellido_paterno=' + separateName[3] + '&apellido_materno=' + separateName[4],
                        headers: {
                          'Content-Type': 'application/json',
                        },                    
                    }).catch((error) => {
                        if (error.response) {
                            if (error.response.status === 500) {
                                alert(`No se encontró alumno con ese nombre [${separateName[0]} ${separateName[1]} ${separateName[2]} ${separateName[3]} ${separateName[4]}], favor de volver a intentarlo`)
                            }
                        }
                    })
                }
            }
            if (res?.data?.length === 1) {
                router.push('/alumnos/alumno?matricula=' + res.data[0].matricula)
            }
        }
    }

    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" display="inline-block" >
                <Toolbar>
                    <Link href="/landing">
                        <Logo height='50' width='50' image='logo-sin-fondo.png'/>
                    </Link>
                    <Search
                        onKeyDown={alumnoSearch}
                    >
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Búsqueda por nombre de alumno o matrícula..."
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={alumnoName}
                            value={alumno}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Stack spacing={2} direction="row">
                        <ColorButton variant="contained" onClick={alumnosView}>
                            <BoyIcon />
                            Alumnos
                        </ColorButton>
                        <ColorButton variant="contained" onClick={asistenciaView}>
                            <CheckBoxIcon />
                            Asistencia
                        </ColorButton>
                        <ColorButton variant="contained" onClick={incidenciasView}>
                            <ReportIcon />
                            Incidencias
                        </ColorButton>
                        <ColorButton variant="contained" onClick={logout}>
                            <LogoutIcon />
                            Salir
                        </ColorButton>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    )
}