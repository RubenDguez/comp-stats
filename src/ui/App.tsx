import { Container } from "@mui/material";
import AppBar from "./components/AppBar";
import Main from "./pages/Main";

function App() {
    return (
        <>
            <AppBar />
            <Container maxWidth="xl">
                <Main />
            </Container>
        </>
    );
}

export default App;
