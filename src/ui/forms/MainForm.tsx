import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
    Button,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import useMain from "../hooks/useMain";

type TMainForm = Omit<ReturnType<typeof useMain>, "statics">;

const MainForm = ({ refs, actions, getters, setters }: TMainForm) => {
    return (
        <form
            ref={refs.formRef}
            onSubmit={(e) => actions.handleFormAction(e)}
            style={{ marginBottom: "2rem" }}
        >
            <Grid container spacing={3}>
                <Grid size={12}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Filename"
                        type="text"
                        name="filename"
                        id="filename"
                        value={getters.filePath}
                        onChange={(e) => setters.setFilePath(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6, xl: 4 }}>
                    <FormControl fullWidth>
                        <InputLabel id="on" shrink>
                            Execute On
                        </InputLabel>
                        <Select
                            label="Execute On"
                            size="small"
                            labelId="on"
                            id="on"
                            value={getters.on}
                            onChange={(e) => setters.setOn(e.target.value)}
                        >
                            {getters.onComputedValues.values.map((val) => (
                                <MenuItem value={val.on}>{val.normalized}</MenuItem>
                            ))}
                        </Select>
                        {getters.onComputedValues.selectedValue?.Description !==
                            undefined && (
                                <FormHelperText>
                                    {getters.onComputedValues.selectedValue.Description}
                                </FormHelperText>
                            )}
                    </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6, xl: 4 }}>
                    <FormControl fullWidth>
                        <InputLabel id="containerArchitecture" shrink>
                            Container Architecture
                        </InputLabel>
                        <Select
                            label="Container Architecture"
                            size="small"
                            labelId="containerArchitecture"
                            id="containerArchitecture"
                            value={getters.contArch}
                            onChange={(e) => setters.setOn(e.target.value)}
                        >
                            <MenuItem value="linux/amd64">linux / amd64</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={{ xs: 12, xl: 4 }} container>
                    <Grid size={6}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Map Server"
                            type="text"
                            name="mapServer"
                            id="mapServer"
                            value={getters.mapServer}
                            onChange={(e) => setters.setMapServer(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            disabled
                            fullWidth
                            size="small"
                            label="Map Server To"
                            type="text"
                            name="mapServerTo"
                            id="mapServerTo"
                            value={getters.mapServerTo}
                            onChange={(e) => setters.setMapServerTo(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid size={12}>
                    <Button
                        loading={getters.isLoading}
                        loadingPosition="start"
                        type="submit"
                        variant="outlined"
                        startIcon={<PlayArrowIcon color="success" />}
                    >
                        Run
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default MainForm;
