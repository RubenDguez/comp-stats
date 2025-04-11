import { Box } from "@mui/material";
import MainTabs from "../components/MainTabs";
import MainForm from "../forms/MainForm";
import useMain from "../hooks/useMain";

const Main = () => {
    const { getters, setters, refs, actions } = useMain();

    return (
        <Box>
            <MainForm
                getters={getters}
                setters={setters}
                refs={refs}
                actions={actions}
            />
            <MainTabs getters={getters} actions={actions} />
        </Box>
    );
};

export default Main;
