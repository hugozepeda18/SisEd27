import { Button, Grid } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReportIcon from '@mui/icons-material/Report';
import { useRouter } from 'next/router'

const ColorButton = styled(Button)(({ theme }) => ({
    color: 'black',
    backgroundColor: alpha("#b4b4b4", 0.85),
    '&:hover': {
      backgroundColor: alpha("#b4b4b4", 0.50),
    },
}));

const defaultTheme = createTheme();

export default function CrearIncidencias() {

    const router = useRouter()

    const incidenciaView = (event) => {
        event.preventDefault()
        router.push('/incidencias/crear/')
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid 
                container 
                spacing={1}
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={6} justifyContent='center'>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        >
                        <ReportIcon fontSize="large"/> 
                        <ColorButton size="large" variant="contained" onClick={incidenciaView}> 
                            Crear nueva incidencia
                        </ColorButton>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}