import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Navbar from '../navbar/Navbar';
import Filtro from '../filtro/Filtro';

const defaultTheme = createTheme();

export default function Asistencia() {

    return (
        <ThemeProvider theme={defaultTheme}>
                <Navbar />
                <Box sx={{ flexGrow: 1, marginTop: 5 }}> 
                    <Filtro/>
                </Box>
        </ThemeProvider>
    )
}