import * as React from 'react';
import { useRouter } from 'next/router'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import { Grid } from "@mui/material";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from "next/link";

const defaultTheme = createTheme();

export default function Alumno() {

    const router = useRouter()

    const [alumnoExist, setAlumnoExist] = React.useState(false)
    const [alumno, setAlumno] = React.useState()
    const [alumnoReportes, setAlumnoReportes] = React.useState([])
    const [noReports, setNoReports] = React.useState(false)

    React.useEffect(() => { 
        async function getAlumno() {
            let response = await axios({
                method: 'get',
                url: process.env.NEXT_PUBLIC_URL_BASE_SERVICE + '/alumnos/id?matricula=' + router.query.matricula,
                headers: {
                  'Content-Type': 'application/json',
                },                    
            })
            if (response.data.length === 1) {
                setAlumno(response.data[0])
                setAlumnoExist(true)
            }
        }
        if (!alumno) getAlumno()
    }, [])

    React.useEffect(() => {
        async function getAlumnoReportes() {
            let response = await axios({
                method: 'get',
                url: process.env.NEXT_PUBLIC_URL_BASE_SERVICE + '/incidencias/alumno?matricula=' + alumno.matricula,
                headers: {
                  'Content-Type': 'application/json',
                },                    
            })
            if (response.data.length == 0) setNoReports(true)
            else {
                setAlumnoReportes(response.data)
                setNoReports(false)
            }
        }
        if (alumno) getAlumnoReportes()
    }, [alumno])

    return (
        <ThemeProvider theme={defaultTheme}>
                <Navbar />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <Typography component="h2" variant="h5" fontWeight="medium">
                        Alumno
                    </Typography>
                </Box>
                {
                    alumnoExist && (
                        <Grid 
                            container 
                            spacing={1}
                            paddingLeft={10}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            marginTop={5}
                        >
                            <Grid item xs={4} justifyContent='center'>
                                <Grid
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    >
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="nombre"
                                            label="Nombre:"
                                            name="nombre"
                                            value={alumno.nombre + ' ' + alumno.apellido_paterno + ' ' + alumno.apellido_materno}
                                        />
                                </Grid>
                            </Grid>
                            <Grid 
                                item 
                                xs={2} 
                                justifyContent='center'
                                alignItems="center">
                                <TextField
                                    margin="normal"
                                    required
                                    id="matricula"
                                    label="Matricula:"
                                    name="matricula"
                                    value={alumno.matricula}
                                />
                            </Grid>
                            <Grid 
                                item 
                                xs={2} 
                                justifyContent='center'
                                alignItems="center">
                                <TextField
                                    margin="normal"
                                    required
                                    id="gradoGrupo"
                                    label="Grado y Grupo:"
                                    name="matricula"
                                    value={alumno.grado + '-' + alumno.grupo}
                                />
                            </Grid>
        
                            <Grid 
                                item 
                                xs={2} 
                                justifyContent='center'
                                alignItems="center">
                                <TextField
                                    margin="normal"
                                    required
                                    id="turno"
                                    label="Turno:"
                                    name="turno"
                                    value={alumno.turno === 'M' ? 'Matutino' : 'Vespertino'}
                                />
                            </Grid>
                        </Grid>
                    )
                }
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <Typography sx={{marginBottom: 2}} component="h2" variant="h5" fontWeight="medium" >
                        Reportes
                    </Typography>
                    {
                        noReports && (
                            <p>No hay reportes para este alumno.</p>
                        )
                    }
                    {
                        !noReports && (
                            <>
                                <TableContainer component={Paper}  paddingLeft={9} >
                                    <Table>
                                        <TableHead>
                                        <TableRow>
                                            <TableCell>Tipo</TableCell>
                                            <TableCell>Fecha</TableCell>
                                            <TableCell>Descripción del acto</TableCell>
                                            <TableCell>Acción de seguimiento</TableCell>
                                            <TableCell>Reportado por</TableCell>
                                            <TableCell>Descripción del aspecto del alumno</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {alumnoReportes.sort(function (a, b) {
                                            return a.tipo - b.tipo
                                        }).map((row) => (
                                            <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, background: row.tipo === 1 ? '#ffffcc' : row.tipo === 2 ? '#ffa07a' : '#cd5c5c' }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    <Link
                                                        onClick={(event) => {
                                                            event.preventDefault()
                                                            //router.push('/incidencias/editar?id=' + row.id)
                                                        }}
                                                        href="#"
                                                    >
                                                        {row.tipo === 1 ? 'Leve' : row.tipo === 2 ? 'Grave' : 'Muy grave'}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>{row.fecha.slice(0,10)}</TableCell>
                                                <TableCell>{row.descripcion}</TableCell>
                                                <TableCell>{row.accion}</TableCell>
                                                <TableCell>{row.personal_id.nombre_completo}</TableCell>
                                                <TableCell>{row.aspecto}</TableCell>
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>
                        )
                    }
                </Box>
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <Typography component="h2" variant="h5" fontWeight="medium">
                        Asistencia
                    </Typography>
                </Box>
        </ThemeProvider>
    )
}