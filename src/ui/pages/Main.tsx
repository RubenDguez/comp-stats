import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  TextField,
} from "@mui/material";
import useMain from "../hooks/useMain";

const Main = () => {
  const { getters, setters, refs, actions } = useMain();

  return (
    <Paper elevation={2} sx={{ padding: "1rem" }}>
      <form ref={refs.formRef} onSubmit={(e) => actions.handleFormAction(e)}>
        <Grid container spacing={2}>
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
            />
          </Grid>
          <Grid size={4}>
            <FormControl fullWidth>
              <InputLabel id="on">Execute On</InputLabel>
              <Select
                label="Execute On"
                size="small"
                labelId="on"
                id="on"
                value={getters.on}
                onChange={(e) => setters.setOn(e.target.value)}
              >
                <MenuItem value="push">Push</MenuItem>
                <MenuItem value="create">Create</MenuItem>
                <MenuItem value="pull_request">Pull Request</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={4}>
            <FormControl fullWidth>
              <InputLabel id="containerArchitecture">
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
              />
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ marginY: "1rem" }}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Command to execute"
            type="text"
            multiline
            rows={3}
            name="command"
            id="command"
            value={getters.command}
          />
        </Box>
        <Box>
          <Button fullWidth type="submit" variant="outlined">
            Run
          </Button>
        </Box>
      </form>

      <TabContext value={getters.value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={actions.handleTabChange}
            aria-label="lab API tabs example"
          >
            <Tab label="Output" value="1" />
            <Tab label="File" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ paddingX: 0, paddingBottom: 0 }}>
          <TextField
            color="success"
            fullWidth
            multiline
            rows={20}
            value={getters.response}
            inputProps={{
              style: { fontFamily: "monospace", fontSize: 12, color: 'gold' },
            }}
          />
        </TabPanel>
        <TabPanel value="2" sx={{ paddingX: 0, paddingBottom: 0 }}>
          <TextField
            color="success"
            fullWidth
            multiline
            rows={20}
            value={getters.fileContent}
            inputProps={{
              style: { fontFamily: "monospace", fontSize: 12, color: 'gold' },
            }}
          />
        </TabPanel>
      </TabContext>
    </Paper>
  );
};

export default Main;
