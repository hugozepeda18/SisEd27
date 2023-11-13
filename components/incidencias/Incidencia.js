import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../navbar/Navbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button, Grid, RadioGroup } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/router'

const actosLeves = [
    'No realiza actividades',
    'Juega en clase',
    'Irrespetuoso con sus compañeros',
    'Distribuye propaganda sin autorización',
    'Promociona actividades en nombre de la escuela sin autorización',
    'Utiliza dispositivos electrónicos u otros objetos fuera de la dinámica de clase',
    'Daños y/o rayones a materiales o mobiliario del aula',
    'Realiza actividades fuera de los estrictamente educativos',
    'Utiliza accesorios fuera del uniforme escolar'
]

const actosGraves = [
    'Realiza actos en contra de la moral y las buenas costumbres',
    'No se presenta puntualmente a clases',
    'Utiliza lenguaje soez o vulgar para agredir a un compañero o cualquier integrante de la escuela',
    'Abandona el salón de clases sin conocimiento del docente'
]

const ColorButton = styled(Button)(({ theme }) => ({
    color: 'black',
    backgroundColor: alpha(theme.palette.common.black, 0.85),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.35),
    },
}));

const defaultTheme = createTheme();

export default function Incidencia () {

    const router = useRouter()

    const [alumno, setAlumno] = useState('')
    const handleSetAlumno = (e) => setAlumno(e.target.value)

    const [fecha, setFecha] = useState(new Date())
    const [mes, setMes] = useState('')

    const [tipoIncidencia, setTipoIncidencia] = useState('')
    const handleTipoIncidencia = (e) => {
        setTipoIncidencia(e.target.value)
        if (e.target.value === 'leve') {
            setLeve(true)
            setGrave(false)
            setMuyGrave(false)
        }
        if (e.target.value === 'grave') {
            setLeve(false)
            setGrave(true)
            setMuyGrave(false)
        }
        if (e.target.value === 'muyGrave') {
            setLeve(false)
            setGrave(false)
            setMuyGrave(true)
        }
    }

    const [leve, setLeve] = useState(false)
    const [grave, setGrave] = useState(false)
    const [muyGrave, setMuyGrave] = useState(false)

    const [alumnoEncontrado, setAlumnoEncontrado] = useState(false)

    const [alumnoData, setAlumnoData] = useState({})

    const [personal, setPersonal] = useState([])

    const [accion, setAccion] = useState('')
    const [aspecto, setAspecto] = useState('')
    const [descripcion, setDescripcion] = useState('')

    const handleSetAccion = (e) => setAccion(e.target.value)
    const handleSetAspecto = (e) => setAspecto(e.target.value)
    const handleSetDescripcion = (e) => setDescripcion(e.target.value)

    const alumnoName = (event) => {
        event.preventDefault()
        handleSetAlumno(event)
    }

    const busquedaAlumno = async (event) => {
        event.preventDefault()
        let res
        if(/\d/.test(alumno)){
            res = await axios({
                method: 'get',
                url: process.env.NEXT_PUBLIC_URL_BASE_SERVICE + '/alumnos/id?matricula=' + alumno,
                headers: {
                  'Content-Type': 'application/json',
                },                    
            })
        } else {
            const separateName = alumno.split(' ')
            if (separateName.length === 3){
                res = await axios({
                    method: 'get',
                    url: process.env.NEXT_PUBLIC_URL_BASE_SERVICE + '/alumnos/nombre?nombre=' + separateName[0] + '&apellido_paterno=' + separateName[1] + '&apellido_materno=' + separateName[2],
                    headers: {
                      'Content-Type': 'application/json',
                    },                    
                })
            } else if (separateName.length === 4) {
                res = await axios({
                    method: 'get',
                    url: process.env.NEXT_PUBLIC_URL_BASE_SERVICE + '/alumnos/nombre?nombre=' + separateName[0] + ' ' + separateName[1] + '&apellido_paterno=' + separateName[2] + '&apellido_materno=' + separateName[3],
                    headers: {
                      'Content-Type': 'application/json',
                    },                    
                })
            } else {
                res = await axios({
                    method: 'get',
                    url: process.env.NEXT_PUBLIC_URL_BASE_SERVICE + '/alumnos/nombre?nombre=' + separateName[0] + ' ' + separateName[1] + ' ' + separateName[2] + '&apellido_paterno=' + separateName[3] + '&apellido_materno=' + separateName[4],
                    headers: {
                      'Content-Type': 'application/json',
                    },                    
                })
            }
        }
        if (res.data.length === 1) {
            setAlumnoData(res.data[0])
            setAlumnoEncontrado(true)
            setFecha(new Date())
            setMes(fecha.getMonth() + 1)
        }
    }

    const generarReporte = async (event) => {
        event.preventDefault()
        let day
        if (fecha.getDate() < 10) {
            day = '0' + fecha.getDate().toString()
        } else {
            day = fecha.getDate().toString()
        }
        let fechaString = fecha.getFullYear().toString() + '-' + mes.toString() + '-' + day
        if (leve) {
            if (accion !== '' || aspecto !== '') { 
                let response = await axios({
                    method: 'post',
                    url: process.env.NEXT_PUBLIC_URL_BASE_SERVICE + '/incidencias',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    data: {
                        alumno_id: alumnoData.matricula,
                        fecha: fechaString,
                        descripcion: actosLeves[selectedIndex],
                        accion: accion,
                        aspecto: aspecto,
                        personal_id: personal[selectedIndexSecond].id,
                        tipo: 1,
                    },
                })
                if (response.status === 201) {
                    alert('Reporte generado con éxito')
                    router.push('/alumnos/alumno?matricula=' + alumnoData.matricula)
                } else {
                    alert('Error al generar el reporte')
                }
            } else {
                alert ('Por favor llenar todos los campos, falto acción de seguimiento y/o aspecto general del alumno')
            }
        } else if (grave) {
            if (accion !== '' || aspecto !== '') {
                let response = await axios({
                    method: 'post',
                    url: process.env.NEXT_PUBLIC_URL_BASE_SERVICE + '/incidencias',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    data: {
                        alumno_id: alumnoData.matricula,
                        fecha: fechaString,
                        descripcion: actosGraves[selectedIndex],
                        accion: accion,
                        aspecto: aspecto,
                        personal_id: personal[selectedIndexSecond].id,
                        tipo: 2,
                    }
                })
                if (response.status === 201) {
                    alert('Reporte generado con éxito')
                    router.push('/alumnos/alumno?matricula=' + alumnoData.matricula)
                }
            } else {
                alert('Por favor llenar todos los campos, falto acción de seguimiento y/o aspecto general del alumno')
            }
        } else if (muyGrave) {
            if (descripcion !== '' || accion !== '') {
                let response = await axios({
                    method: 'post',
                    url: process.env.NEXT_PUBLIC_URL_BASE_SERVICE + '/incidencias',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    data: {
                        alumno_id: alumnoData.matricula,
                        fecha: fechaString,
                        descripcion: descripcion,
                        accion: accion,
                        aspecto: '',
                        personal_id: personal[selectedIndex].id,
                        tipo: 3,
                    }
                })
                if (response.status === 201) {
                    alert('Reporte generado con éxito')
                    router.push('/alumnos/alumno?matricula=' + alumnoData.matricula)
                }
            } else {
                alert('Por favor llenar todos los campos, falto descripción del acto y/o acción de seguimiento')
            }
        }
    }

    React.useEffect(() => {
        async function fetchData () {
            let response = await axios({
                method: 'get',
                url: process.env.NEXT_PUBLIC_URL_BASE_SERVICE + '/personal',
                headers: {
                  'Content-Type': 'application/json',
                },                    
            })
            if (response.data.length > 0) {
                setPersonal(response.data)
            }
        }
        fetchData()
    }, [])

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [anchorElSecond, setAnchorElSecond] = React.useState(null);
    const [selectedIndexSecond, setSelectedIndexSecond] = React.useState(1);
    const openSecond = Boolean(anchorElSecond);
    const handleClickListItemSecond = (event) => {
        setAnchorElSecond(event.currentTarget);
    };

    const handleMenuItemClickSecond = (event, index) => {
        setSelectedIndexSecond(index);
        setAnchorElSecond(null);
    };

    const handleCloseSecond = () => {
        setAnchorElSecond(null);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Navbar />
            <Grid 
                container 
                spacing={1}
                direction="row"
                justifyContent="center"
                alignItems="center"
                marginTop={5}
                component="form"
            >
                <Typography component="h1" variant="h5" fontWeight="medium">
                    Nuevo Reporte
                </Typography>
            </Grid>
            {
                !alumnoEncontrado && (
                    <Grid 
                        container 
                        spacing={1}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        component="form"
                    >
                        <Grid item xs={6} justifyContent='center'>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                >   
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="nombre"
                                        label="Nombre Completo del Alumno / Matricula"
                                        name="nombre"
                                        autoComplete="nombre"
                                        onChange={alumnoName}
                                        value={alumno}
                                    />
                                    <ColorButton variant="contained" onClick={busquedaAlumno}>
                                        Generar Reporte para Alumno
                                    </ColorButton>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            }
            {
                alumnoEncontrado && (
                    <>
                        <Grid 
                            container 
                            spacing={1}
                            paddingLeft={10}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            marginTop={1}
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
                                            value={alumnoData.nombre + ' ' + alumnoData.apellido_paterno + ' ' + alumnoData.apellido_materno}
                                        />
                                </Grid>
                            </Grid>
                            <Grid 
                                item 
                                xs={8} 
                                justifyContent='center'
                                alignItems="center">
                                <TextField
                                    margin="normal"
                                    id="grado"
                                    label="Grado:"
                                    name="grado"
                                    value={alumnoData.grado}
                                />
                                <TextField
                                    margin="normal"
                                    id="grupo"
                                    label="Grupo:"
                                    name="grupo"
                                    value={alumnoData.grupo}
                                />
                                <TextField
                                    margin="normal"
                                    id="turno"
                                    label="Turno:"
                                    name="turno"
                                    value={alumnoData.turno}
                                />
                                <TextField
                                    margin="normal"
                                    id="fecha"
                                    label="A:"
                                    name="fecha"
                                    value={fecha.getDate() + '/' + mes + '/' + fecha.getFullYear()}
                                />
                            </Grid>
                        </Grid>
                    </>
                )
            }
            {
                alumnoEncontrado && (
                    <Box
                        paddingLeft={10}
                    >
                        <FormControl>
                            <FormLabel id="tipoReporte">Seleccione el tipo de reporte</FormLabel>
                            <RadioGroup
                                row
                                name="tipoReporteGroup"
                                value={tipoIncidencia}
                                onChange={handleTipoIncidencia}
                            >
                                <FormControlLabel value="leve" control={<Radio />} label="Acto Leve" />
                                <FormControlLabel value="grave" control={<Radio />} label="Acto Grave" />
                                <FormControlLabel value="muyGrave" control={<Radio />} label="Acto Muy Grave" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                )
            }
            {
                muyGrave && (
                    <>
                        <Grid 
                            container 
                            spacing={1}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            paddingLeft={9}
                        >
                            <Grid item xs={6} justifyContent='center'>
                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel htmlFor="actoMuyGrave">Descripción del acto (por parte del docente y/o personal educativo):</InputLabel>
                                    <OutlinedInput
                                        id="actoMuyGrave"
                                        onChange={handleSetDescripcion}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} justifyContent='center'>
                                <List
                                    component="nav"
                                >
                                    <ListItem
                                        id="personalReporte"
                                        onClick={handleClickListItem}
                                        >
                                        <ListItemText
                                            primary="Nombre de quien reporta: "
                                            secondary={personal[selectedIndex].nombre_completo}
                                        />
                                        </ListItem>
                                </List>
                                <Menu
                                    id="personal"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        role: 'listbox',
                                    }}
                                >
                                    {personal.map((option, index) => (
                                        option.turno === alumnoData.turno && (
                                            <MenuItem
                                                key={option.id}
                                                selected={index === selectedIndex}
                                                onClick={(event) => handleMenuItemClick(event, index)}
                                            >
                                                {option.nombre_completo}
                                            </MenuItem>
                                        )
                                    ))}
                                </Menu>
                            </Grid>
                        </Grid>
                        <Grid 
                            container 
                            spacing={1}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            paddingLeft={9}
                        >
                            <Grid item xs={6} justifyContent='center'>
                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel htmlFor="actoMuyGraveSeguimiento">Acción de seguimiento:</InputLabel>
                                    <OutlinedInput
                                        id="actoMuyGraveSeguimiento"
                                        onChange={handleSetAccion}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} justifyContent='center'/>
                        </Grid>
                    </>
                )
            }
            { leve && (
                    <>
                        <Grid 
                            container 
                            spacing={1}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            paddingLeft={9}
                            paddingRight={16}
                        >
                            <Grid item xs={6} justifyContent='center'>
                                <List
                                    component="nav"
                                >
                                    <ListItem
                                        id="menuLeveSeleccionado"
                                        onClick={handleClickListItem}
                                        >
                                        <ListItemText
                                            primary="Acto Leve: "
                                            secondary={actosLeves[selectedIndex]}
                                        />
                                        </ListItem>
                                </List>
                                <Menu
                                    id="menuLeve"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        role: 'listbox',
                                    }}
                                >
                                    {actosLeves.map((option, index) => (
                                        <MenuItem
                                            key={option.id}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Grid>
                            <Grid item xs={6} justifyContent='center'>
                                <List
                                    component="nav"
                                >
                                    <ListItem
                                        id="personalReporteSeleccionado"
                                        onClick={handleClickListItemSecond}
                                        >
                                        <ListItemText
                                            primary="Nombre de quien reporta: "
                                            secondary={personal[selectedIndexSecond].nombre_completo}
                                        />
                                        </ListItem>
                                </List>
                                <Menu
                                    id="personalReporte"
                                    anchorEl={anchorElSecond}
                                    open={openSecond}
                                    onClose={handleCloseSecond}
                                    MenuListProps={{
                                        role: 'listbox',
                                    }}
                                >
                                    {personal.map((option, index) => (
                                        option.turno === alumnoData.turno && (
                                            <MenuItem
                                                key={option.id}
                                                selected={index === selectedIndexSecond}
                                                onClick={(event) => handleMenuItemClickSecond(event, index)}
                                            >
                                                {option.nombre_completo}
                                            </MenuItem>
                                        )
                                    ))}
                                </Menu>
                            </Grid>
                        </Grid>
                        <Grid 
                            container 
                            spacing={1}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            paddingLeft={9}
                            paddingRight={16}
                        >
                            <Grid item xs={6} justifyContent='center'>
                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel htmlFor="actoLeveSeguimiento">Acción de seguimiento:</InputLabel>
                                    <OutlinedInput
                                        id="actoLeveSeguimiento"
                                        onChange={handleSetAccion}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} justifyContent='center'>
                                <FormControl fullWidth sx={{ m: 1 , marginRight: -20}}>
                                    <InputLabel htmlFor="actoLeveDesc">Describa el aspecto general del alumno:</InputLabel>
                                    <OutlinedInput
                                        id="actoLeveDesc"
                                        onChange={handleSetAspecto}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </>
                )
            }

            { grave && (
                    <>
                        <Grid 
                            container 
                            spacing={1}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            paddingLeft={9}
                            paddingRight={16}
                        >
                            <Grid item xs={6} justifyContent='center'>
                                <List
                                    component="nav"
                                >
                                    <ListItem
                                        id="menuGraveSeleccionado"
                                        onClick={handleClickListItem}
                                        >
                                        <ListItemText
                                            primary="Acto Grave: "
                                            secondary={actosGraves[selectedIndex]}
                                        />
                                        </ListItem>
                                </List>
                                <Menu
                                    id="menuGrave"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        role: 'listbox',
                                    }}
                                >
                                    {actosGraves.map((option, index) => (
                                        <MenuItem
                                            key={option.id}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Grid>
                            <Grid item xs={6} justifyContent='center'>
                                <List
                                    component="nav"
                                >
                                    <ListItem
                                        id="personalReporteSeleccionado"
                                        onClick={handleClickListItemSecond}
                                        >
                                        <ListItemText
                                            primary="Nombre de quien reporta: "
                                            secondary={personal[selectedIndexSecond].nombre_completo}
                                        />
                                        </ListItem>
                                </List>
                                <Menu
                                    id="personalReporte"
                                    anchorEl={anchorElSecond}
                                    open={openSecond}
                                    onClose={handleCloseSecond}
                                    MenuListProps={{
                                        role: 'listbox',
                                    }}
                                >
                                    {personal.map((option, index) => (
                                        option.turno === alumnoData.turno && (
                                            <MenuItem
                                                key={option.id}
                                                selected={index === selectedIndexSecond}
                                                onClick={(event) => handleMenuItemClickSecond(event, index)}
                                            >
                                                {option.nombre_completo}
                                            </MenuItem>
                                        )
                                    ))}
                                </Menu>
                            </Grid>
                        </Grid>
                        <Grid 
                            container 
                            spacing={1}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            paddingLeft={9}
                            paddingRight={16}
                        >
                            <Grid item xs={6} justifyContent='center'>
                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel htmlFor="actoLeveSeguimiento">Acción de seguimiento:</InputLabel>
                                    <OutlinedInput
                                        id="actoLeveSeguimiento"
                                        onChange={handleSetAccion}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} justifyContent='center'>
                                <FormControl fullWidth sx={{ m: 1 , marginRight: -20}}>
                                    <InputLabel htmlFor="actoLeveDesc">Describa el aspecto general del alumno:</InputLabel>
                                    <OutlinedInput
                                        id="actoLeveDesc"
                                        onChange={handleSetAspecto}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </>
                )
            }
            {
                (leve || grave || muyGrave) && (
                    <>
                        <Box sx={{ flexGrow: 1, marginLeft: 10}}>
                            <ColorButton variant="contained"  onClick={generarReporte}>Generar Reporte</ColorButton>
                        </Box>
                    </>
                )
            }

            

        </ThemeProvider>
    )
}