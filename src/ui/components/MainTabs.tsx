import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
    Box,
    Button,
    Grid,
    LinearProgress,
    Paper,
    Tab,
    TextField,
    Typography,
} from "@mui/material";
import useMain from "../hooks/useMain";

type TMainTabs = Omit<
    ReturnType<typeof useMain>,
    "setters" | "refs" | "statics"
>;

const MainTabs = ({ getters, actions }: TMainTabs) => {
    return (
        <TabContext value={getters.value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                    onChange={actions.handleTabChange}
                    aria-label="lab API tabs example"
                >
                    <Tab label="Log" value="1" />
                    <Tab label="File" value="2" />
                    <Tab label="Command" value="3" />
                </TabList>
            </Box>
            <TabPanel value="1" sx={{ paddingX: 0, paddingBottom: 0 }}>
                {getters.isLoading && (
                    <Box sx={{ marginBottom: "2px" }}>
                        <LinearProgress />
                    </Box>
                )}
                <Grid container spacing={2}>
                    <Grid size={2}>
                        <Paper
                            sx={{
                                height: "100%",
                                padding: "1rem",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                            }}
                        >
                            {getters.jobs !== null &&
                                getters.jobs.map((m) => (
                                    <Button
                                        size="small"
                                        color="success"
                                        variant="outlined"
                                        sx={{ justifyContent: "start" }}
                                        startIcon={<CircleOutlinedIcon />}
                                    >
                                        {m}
                                    </Button>
                                ))}
                        </Paper>
                    </Grid>
                    <Grid size={10}>
                        <TextField
                            color="success"
                            fullWidth
                            multiline
                            rows={25}
                            value={getters.isLoading ? "" : getters.response}
                            inputProps={{
                                style: {
                                    fontFamily: "monospace",
                                    fontSize: 12,
                                },
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value="2" sx={{ paddingX: 0, paddingBottom: 0 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="caption">YML / YAML</Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={25}
                            value={getters.ymlContent}
                            inputProps={{
                                style: {
                                    fontFamily: "monospace",
                                    fontSize: 12,
                                },
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="caption">JSON</Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={25}
                            value={
                                getters.jsonContent !== null
                                    ? JSON.stringify(getters.jsonContent, null, 2)
                                    : ""
                            }
                            inputProps={{
                                style: {
                                    fontFamily: "monospace",
                                    fontSize: 12,
                                },
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value="3" sx={{ paddingX: 0, paddingBottom: 0 }}>
                <TextField
                    fullWidth
                    multiline
                    rows={25}
                    value={getters.command}
                    inputProps={{
                        style: {
                            fontFamily: "monospace",
                            fontSize: 12,
                        },
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </TabPanel>
        </TabContext>
    );
};

export default MainTabs;
