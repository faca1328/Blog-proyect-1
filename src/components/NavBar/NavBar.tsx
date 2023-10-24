import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar'
import { NavBarLogin } from './NavBarLogin';


export function NavBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    
                    <h1> Blog Web</h1>

                    <NavBarLogin />

                </Toolbar>
            </AppBar>
        </Box>
    );
}
