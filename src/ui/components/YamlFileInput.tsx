import { Button, Grid, Typography } from "@mui/material";
import { Dispatch } from "react";

interface IYamlFileInput {
    setter: Dispatch<React.SetStateAction<string>>;
    getter: string;
}

const YamlFileInput = ({ setter, getter }: IYamlFileInput) => {
    const handleLoadFilePath = async () => {
        const path = await window.electron.loadFilePath();
        if (path) {
            setter(path);
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid>
                <Button size="small" variant="outlined" onClick={handleLoadFilePath}>
                    Upload File
                </Button>
            </Grid>
            {getter && (
                <Grid
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography display="block" variant="caption">
                        File Path: {getter}
                    </Typography>
                </Grid>
            )}
        </Grid>
    );
};

export default YamlFileInput;
