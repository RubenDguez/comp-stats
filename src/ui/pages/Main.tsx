import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Tab,
  TextField,
} from "@mui/material";
import useMain from "../hooks/useMain";

const Main = () => {
  const { getters, setters, refs, actions } = useMain();

  return (
    <Box>
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
          <Grid size={4}>
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
                {getters.onVals.values.map((val) => (
                  <MenuItem value={val.on}>{val.normalized}</MenuItem>
                ))}
              </Select>
              {getters.onVals.selectedValue?.Description !== undefined && (
                <FormHelperText>
                  {getters.onVals.selectedValue.Description}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={4}>
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
          <Grid size={4} container>
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
          <TextField
            color="success"
            fullWidth
            multiline
            rows={25}
            value={getters.isLoading ? "" : getters.response}
            inputProps={{
              style: { fontFamily: "monospace", fontSize: 12, color: "gold" },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </TabPanel>
        <TabPanel value="2" sx={{ paddingX: 0, paddingBottom: 0 }}>
          <TextField
            fullWidth
            multiline
            rows={25}
            value={getters.fileContent}
            inputProps={{
              style: { fontFamily: "monospace", fontSize: 12, color: "gold" },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </TabPanel>
        <TabPanel value="3" sx={{ paddingX: 0, paddingBottom: 0 }}>
          <TextField
            fullWidth
            multiline
            rows={25}
            value={getters.command}
            inputProps={{
              style: { fontFamily: "monospace", fontSize: 12, color: "gold" },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Main;
