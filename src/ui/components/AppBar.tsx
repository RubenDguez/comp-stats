import Bar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function AppBar() {
    return (
        <Box sx={{ flexGrow: 1, marginBottom: "2rem" }}>
            <Bar position="static" color='info'>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Local GitHub Actions
                    </Typography>
                </Toolbar>
            </Bar>
        </Box>
    );
}
