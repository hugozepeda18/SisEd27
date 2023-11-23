'use client'

import * as React from 'react';
import { Button, Grid } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import { useRouter } from 'next/router'
import GroupIcon from '@mui/icons-material/Group';
import Typography from '@mui/material/Typography';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from "next/link";

const ColorButton = styled(Button)(({ theme }) => ({
    color: 'black',
    backgroundColor: alpha("#b4b4b4", 0.85),
    '&:hover': {
      backgroundColor: alpha("#b4b4b4", 0.50),
    },
}));

const defaultTheme = createTheme();

export default function Filtro() {

    const router = useRouter()

    const [turno, setTurno] = React.useState('')
    const [matutino, setMatutino] = React.useState(false)
    const [grado, setGrado] = React.useState('')
    const [grupo, setGrupo] = React.useState(false)
    const [grupoInfo, setGrupoInfo] = React.useState('')
    const [button, setButton] = React.useState(false)
    const [requestAlumnos, setRequestAlumnos] = React.useState([])
    const [requestAlumnosFlag, setRequestAlumnosFlag] = React.useState(false)
    const [requestIncidenciasFlag, setRequestIncidenciasFlag] = React.useState(false)
    const [requestAsistenciaFlag, setRequestAsistenciaFlag] = React.useState(false)

    const gradosButtons = (event) => {
        event.preventDefault()
        if(event.target.value == 'M'){
            setTurno('M')
        } else {
            setTurno('V')
        }
        setMatutino(true)
    }

    const gruposButtons = (event) => {
        event.preventDefault()
        if(event.target.value == '1'){
            setGrado('1')
        } else if (event.target.value == '2'){
            setGrado('2')
        } else if (event.target.value == '3'){
            setGrado('3')
        }
        setGrupo(true)
    }

    const grupoInfoView = (event) => { 
        event.preventDefault()
        if(event.target.value == 'A'){
            setGrupoInfo('A')
        } else if (event.target.value == 'B'){
            setGrupoInfo('B')
        } else if (event.target.value == 'C'){
            setGrupoInfo('C')
        } else if (event.target.value == 'D'){
            setGrupoInfo('D')
        } else if (event.target.value == 'E'){
            setGrupoInfo('E')
        } else if (event.target.value == 'X'){
            setGrupoInfo('')
            setGrupo(false)
        }
        setButton(true)
    }

    async function getAlumnosGrupoTurnoGrado() {
        let response = await axios({
            method: 'get',
            url: process.env.NEXT_PUBLIC_URL_BASE_SERVICE + '/alumnos/grupo?grado=' + grado + '&grupo=' + grupoInfo + '&turno=' + turno,
            headers: {
              'Content-Type': 'application/json',
            },
        })
        if (response.data.length > 0) {
            if (router.pathname == '/alumnos') {
                setRequestAlumnos(response.data)
                setRequestAlumnosFlag(true)
            } else if (router.pathname == '/incidencias') {
                setRequestAlumnos(response.data)
                setRequestIncidenciasFlag(true)
            } else if (router.pathname == '/asistencia') {
                setRequestAlumnos(response.data)
                setRequestAsistenciaFlag(true)
            }
        }
    }

    async function getAlumnosGradoTurno() {
        let response = await axios({
            method: 'get',
            url: process.env.NEXT_PUBLIC_URL_BASE_SERVICE + '/alumnos/grado?grado=' + grado + '&turno=' + turno,
            headers: {
              'Content-Type': 'application/json',
            },
        })
        if (response.data.length > 0) {
            if (router.pathname == '/alumnos') {
                setRequestAlumnos(response.data)
                setRequestAlumnosFlag(true)
            } else if (router.pathname == '/incidencias') {
                setRequestAlumnos(response.data)
                setRequestIncidenciasFlag(true)
            }
        }
    }

    const busqueda = (event) => {
        event.preventDefault()
        switch (router.pathname) {
            case '/alumnos':
                if (grupoInfo == '') {
                    getAlumnosGradoTurno()
                } else {
                    getAlumnosGrupoTurnoGrado()
                }
            case '/incidencias':
                if (grupoInfo == '') {
                    getAlumnosGradoTurno()
                } else {
                    getAlumnosGrupoTurnoGrado()
                }
            case '/asistencia': 
                if (grupoInfo == '') {
                    getAlumnosGradoTurno()
                } else {
                    getAlumnosGrupoTurnoGrado()
                }
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid 
                container 
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={2} justifyContent='center'>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        >
                        <WbSunnyIcon fontSize="large"/>
                        <ColorButton size="large" variant="contained" value="M" onClick={gradosButtons}>Turno Matutino</ColorButton>
                    </Grid>
                </Grid>
                <Grid item xs={3} justifyContent='center'>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        >
                        <WbTwilightIcon fontSize="large"/> 
                        <ColorButton size="large" variant="contained" value="V" onClick={gradosButtons}>Turno Vespertino</ColorButton>
                    </Grid>
                </Grid>
                { matutino && (
                    <>
                        <Grid item xs={1} justifyContent='center'>
                            <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            >
                                <GroupIcon fontSize="large"/> 
                                <ColorButton size="large" variant="contained" value="1" onClick={gruposButtons}>1</ColorButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={1} justifyContent='center'>
                            <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            >
                                <GroupIcon fontSize="large"/> 
                                <ColorButton size="large" variant="contained" value="2" onClick={gruposButtons}>2</ColorButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={1} justifyContent='center'>
                            <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            >
                                <GroupIcon fontSize="large"/> 
                                <ColorButton size="large" variant="contained" value="3" onClick={gruposButtons}>3</ColorButton>
                            </Grid>
                        </Grid>
                    </>
                )
                }
            </Grid>
            {   grupo && (
                    <Grid 
                        container 
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        marginTop={3}
                    >
                        <Grid item xs={1} justifyContent='center'>
                            <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            >
                                <GroupIcon fontSize="large"/> 
                                <ColorButton size="large" variant="contained" value="A" onClick={grupoInfoView}>A</ColorButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={1} justifyContent='center'>
                            <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            >
                                <GroupIcon fontSize="large"/> 
                                <ColorButton size="large" variant="contained" value="B" onClick={grupoInfoView}>B</ColorButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={1} justifyContent='center'>
                            <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            >
                                <GroupIcon fontSize="large"/> 
                                <ColorButton size="large" variant="contained" value="C" onClick={grupoInfoView}>C</ColorButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={1} justifyContent='center'>
                            <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            >
                                <GroupIcon fontSize="large"/> 
                                <ColorButton size="large" variant="contained" value="D" onClick={grupoInfoView}>D</ColorButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={1} justifyContent='center'>
                            <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            >
                                <GroupIcon fontSize="large"/> 
                                <ColorButton size="large" variant="contained" value="E" onClick={grupoInfoView}>E</ColorButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={2} justifyContent='center'>
                            <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            >
                                <GroupIcon fontSize="large"/> 
                                <ColorButton size="large" variant="contained" value="X" onClick={grupoInfoView}>Sin grupo</ColorButton>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            }
            {  button && (
                <Grid 
                    container 
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    marginTop={3}
                    marginBottom={3}
                >
                    <Grid item xs={3} justifyContent='center'>
                        <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        >
                            <Typography component="h3" variant="h5" fontWeight="medium">
                                Solicitud: {grado}-{grupoInfo}  {turno == 'M' ? 'Matutino' : 'Vespertino'} 
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} justifyContent='center'>
                        <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        >
                            <ColorButton size="large" variant="contained" value="E" onClick={busqueda}>
                                <ManageSearchIcon 
                                    fontSize='large'
                                />
                                Buscar
                            </ColorButton>
                        </Grid>
                    </Grid>
                </Grid>
                )
            }
            {
                requestAlumnosFlag && (
                    <>
                        <TableContainer component={Paper}  paddingLeft={9} >
                        <Table>
                            <TableHead>
                            <TableRow>
                                <TableCell>Matricula</TableCell>
                                <TableCell>Nombre Completo</TableCell>
                                <TableCell>CURP</TableCell>
                                <TableCell align="right">Grado</TableCell>
                                <TableCell align="right">Grupo</TableCell>
                                <TableCell align="right">Turno</TableCell>
                                <TableCell align="right">Sexo</TableCell>
                                <TableCell align="right">Edad</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {requestAlumnos.map((row) => (
                                <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Link
                                            onClick={(event) => {
                                                event.preventDefault()
                                                router.push('/alumnos/alumno?matricula=' + row.matricula)
                                            }}
                                            href="#"
                                        >
                                            {row.matricula}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            onClick={(event) => {
                                                event.preventDefault()
                                                router.push('/alumnos/alumno?matricula=' + row.matricula)
                                            }}
                                            href="#"
                                        >
                                            {row.nombre + ' ' + row.apellido_paterno + ' ' + row.apellido_materno}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{row.curp}</TableCell>
                                    <TableCell align="right">{row.grado}</TableCell>
                                    <TableCell align="right">{row.grupo}</TableCell>
                                    <TableCell align="right">{row.turno}</TableCell>
                                    <TableCell align="right">{row.sexo}</TableCell>
                                    <TableCell align="right">{row.edad}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                    </>
                )
            }
            {
                requestIncidenciasFlag && (
                    <>
                        <TableContainer component={Paper}  paddingLeft={9} >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Matrícula</TableCell>
                                    <TableCell>Nombre Completo</TableCell>
                                    <TableCell>Incidencias Leves</TableCell>
                                    <TableCell>Incidencias Graves</TableCell>
                                    <TableCell>Incidencias Muy Graves</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {requestAlumnos.map((row) => (
                                <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Link
                                            onClick={(event) => {
                                                event.preventDefault()
                                                router.push('/alumnos/alumno?matricula=' + row.matricula)
                                            }}
                                            href="#"
                                        >
                                            {row.matricula}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            onClick={(event) => {
                                                event.preventDefault()
                                                router.push('/alumnos/alumno?matricula=' + row.matricula)
                                            }}
                                            href="#"
                                        >
                                            {row.nombre + ' ' + row.apellido_paterno + ' ' + row.apellido_materno}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{row.incidencias}</TableCell>
                                    <TableCell>{row.incidencias_graves}</TableCell>
                                    <TableCell>{row.incidencias_muy_graves}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                    </>
                )
            }
            {
                requestAsistenciaFlag && (
                    <>
                        <TableContainer component={Paper}  paddingLeft={9} >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Matrícula</TableCell>
                                    <TableCell>Nombre Completo</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {requestAlumnos.map((row) => (
                                <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Link
                                            onClick={(event) => {
                                                event.preventDefault()
                                                router.push('/alumnos/alumno?matricula=' + row.matricula)
                                            }}
                                            href="#"
                                        >
                                            {row.matricula}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            onClick={(event) => {
                                                event.preventDefault()
                                                router.push('/alumnos/alumno?matricula=' + row.matricula)
                                            }}
                                            href="#"
                                        >
                                            {row.nombre + ' ' + row.apellido_paterno + ' ' + row.apellido_materno}
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                    </>
                )
            }
        </ThemeProvider>
    )
}