'use client'

import * as React from 'react';
import { Button, Grid } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import { useRouter } from 'next/router'
import GroupIcon from '@mui/icons-material/Group';
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

    const [turnoSeleccionado, setTurnoSeleccionado] = React.useState('')
    const [turno, setTurno] = React.useState(false)
    const [matutino, setMatutino] = React.useState(false)
    const [grupo, setGrupo] = React.useState(false)

    const [requestAlumnos, setRequestAlumnos] = React.useState([])

    const [requestAlumnosGrado, setRequestAlumnosGrado] = React.useState([])
    const [grado, setGrado] = React.useState(false)
    const [gradoAsistencia, setGradoAsistencia] = React.useState(false)
    const [gradoIncidencias, setGradoIncidencias] = React.useState(false)

    const [requestAlumnosGrupo, setRequestAlumnosGrupo] = React.useState([])
    const [requestAlumnosGrupoFlag, setRequestAlumnosGrupoFlag] = React.useState(false)
    const [requestAlumnosGrupoAsistenciaFlag, setRequestAlumnosGrupoAsistenciaFlag] = React.useState(false)
    const [requestAlumnosGrupoIncidenciasFlag, setRequestAlumnosGrupoIncidenciasFlag] = React.useState(false)

    const [requestAlumnosFlag, setRequestAlumnosFlag] = React.useState(false)
    const [requestIncidenciasFlag, setRequestIncidenciasFlag] = React.useState(false)
    const [requestAsistenciaFlag, setRequestAsistenciaFlag] = React.useState(false)

    const gradosButtons = (event) => {
        event.preventDefault()
        if(event.target.value == 'M'){
            getAlumnosTurno('M')
            setTurnoSeleccionado('M')
        } else {
            getAlumnosTurno('V')
            setTurnoSeleccionado('V')
        }
        setTurno(true)
        setMatutino(true)
        setGrupo(false)
    }

    async function getAlumnosTurno(turno) {
        await axios({
            method: 'get',
            url: process.env.NEXT_PUBLIC_URL_BASE_SERVICE + '/alumnos/turno?turno=' + turno,
            headers: {
              'Content-Type': 'application/json',
            },
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 500) {
                    alert('No se encontraron alumnos con esas características.')
                }
            }
        }).then((response) => {
            if (response?.data?.length > 0) {
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
        })
    }

    const gruposButtons = (event) => {
        event.preventDefault()
        let gradoFilter = []
        if(event.target.value == '1'){
            gradoFilter = requestAlumnos.filter((alumno) => alumno.grado == '1')
        } else if (event.target.value == '2'){
            gradoFilter = requestAlumnos.filter((alumno) => alumno.grado == '2')
        } else if (event.target.value == '3'){
            gradoFilter = requestAlumnos.filter((alumno) => alumno.grado == '3')
        }
        setRequestAlumnosGrado(gradoFilter)
        setGrupo(true)
        if (router.pathname == '/alumnos') {
            setRequestAlumnosFlag(false)
            setGrado(true)
            setGradoAsistencia(false)
            setGradoIncidencias(false)
        } else if (router.pathname == '/incidencias') {
            setRequestIncidenciasFlag(false)
            setGradoIncidencias(true)
            setGrado(false)
            setGradoAsistencia(false)
        } else if (router.pathname == '/asistencia') {
            setRequestAsistenciaFlag(false)
            setGradoAsistencia(true)
            setGrado(false)
            setGradoIncidencias(false)
        }
    }

    const grupoInfoView = (event) => { 
        event.preventDefault()
        let grupoFilter = []
        if(event.target.value == 'A'){
            grupoFilter = requestAlumnosGrado.filter((alumno) => alumno.grupo == 'A')
        } else if (event.target.value == 'B'){
            grupoFilter = requestAlumnosGrado.filter((alumno) => alumno.grupo == 'B')
        } else if (event.target.value == 'C'){
            grupoFilter = requestAlumnosGrado.filter((alumno) => alumno.grupo == 'C')
        } else if (event.target.value == 'D'){
            grupoFilter = requestAlumnosGrado.filter((alumno) => alumno.grupo == 'D')
        } else if (event.target.value == 'E'){
            grupoFilter = requestAlumnosGrado.filter((alumno) => alumno.grupo == 'E')
        }
        setRequestAlumnosGrupo(grupoFilter)
        setGrupo(true)
        if (router.pathname == '/alumnos') {
            setGrado(false)
            setRequestAlumnosGrupoFlag(true)
        } else if (router.pathname == '/incidencias') {
            setGradoIncidencias(false)
            setRequestAlumnosGrupoIncidenciasFlag(true)
        } else if (router.pathname == '/asistencia') {
            setGradoAsistencia(false)
            setRequestAlumnosGrupoAsistenciaFlag(true)
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
                marginBottom={3}
            >
                <Grid item xs={2} justifyContent='center'>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        >
                        <WbSunnyIcon fontSize="large"/>
                        <ColorButton size="large" variant="contained" value="M" onClick={gradosButtons}>Matutino</ColorButton>
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
                        <ColorButton size="large" variant="contained" value="V" onClick={gradosButtons}>Vespertino</ColorButton>
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
                        marginBottom={3}
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
                        {
                            turnoSeleccionado == 'M' && (
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
                            ) 
                        }
                    </Grid>
                )
            }
            

            {/* /alumnos endpoint */}
            {
                turno && requestAlumnosFlag && (
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
                turno && grado && (
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
                            {requestAlumnosGrado.map((row) => (
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
                turno && requestAlumnosGrupoFlag && (
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
                            {requestAlumnosGrupo.map((row) => (
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

            {/* /incidencias endpoint */}
            {
                turno && requestIncidenciasFlag && (
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
                turno && gradoIncidencias && (
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
                            {requestAlumnosGrado.map((row) => (
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
                turno && requestAlumnosGrupoIncidenciasFlag && (
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
                            {requestAlumnosGrupo.map((row) => (
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

            {/* /asistencia endpoint */}
            {
                turno && requestAsistenciaFlag && (
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
            {
                turno && gradoAsistencia && (
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
                            {requestAlumnosGrado.map((row) => (
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
            {
                turno && requestAlumnosGrupoAsistenciaFlag && (
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
                            {requestAlumnosGrupo.map((row) => (
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