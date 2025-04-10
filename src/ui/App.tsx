import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
// import { BaseChart } from "./components/BaseChart";
// import useStatistics from "./hooks/useStatistics";
/**
 *
 * act push -W '.github/workflows/TEST.yaml' --container-architecture linux/amd64
 *
 */

function App() {
  const [response, setResponse] = useState<string>("");
  const [fileContent, setFileConent] = useState<string>("");
  const [command, setCommand] = useState<string>("");

  const [filePath, setFilePath] = useState<string>("");
  const [on, setOn] = useState<string>("push");
  const [contArch, setContArch] = useState<string>("linux/amd64");
  const [isError, setIsError] = useState<boolean>(false);
  const [mapServer, setMapServer] = useState<string>("");
  const [mapServerTo, setMapServerTo] = useState<string>("ubuntu");
  const [displayFile, setDisplayFile] = useState<boolean>(false);

  // const statistics = useStatistics(10);
  const formRef = useRef<HTMLFormElement>(null);

  const handleDisplayChange = useCallback((key: "file" | "response") => {
    switch (key) {
      case "file":
        setDisplayFile(true);
        break;
      case "response":
        setDisplayFile(false);
        break;
      default:
        throw new Error(`Invalid key: ${key}`);
    }
  }, []);

  const handleFormAction = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setResponse("Running...");
      setIsError(false);

      try {
        const fileCont = await window.electron.exec(`cat ${filePath}`);
        setFileConent(fileCont);
      } catch (error) {
        setFileConent((error as Error).message);
      }

      let response: string = "";

      try {
        response = await window.electron.exec(command);
      } catch (error) {
        setIsError(true);
        response = (error as Error).message;
      }

      setResponse(response);
    },
    [command, filePath]
  );

  useEffect(() => {
    setCommand(
      mapServer !== ""
        ? `act ${on} -W '${filePath}' --container-architecture ${contArch} -P ${mapServer}=${mapServerTo}`
        : `act ${on} -W '${filePath}' --container-architecture ${contArch}`
    );
  }, [filePath, on, contArch, mapServer, mapServerTo]);

  return (
    <div className="wrapper">
      <form
        className="form"
        ref={formRef}
        onSubmit={(e) => handleFormAction(e)}
      >
        <div className="settings">
          <div className="formField">
            <label htmlFor="filename">File</label>
            <input
              type="text"
              name="filename"
              id="filename"
              onChange={(e) => setFilePath(e.target.value)}
            />
          </div>
          <div className="formField">
            <label htmlFor="on">on</label>
            <select name="on" id="on" onChange={(e) => setOn(e.target.value)}>
              <option value="push">Push</option>
              <option value="create">Create</option>
              <option value="pull_request">Pull Request</option>
            </select>
          </div>
          <div className="formField">
            <label htmlFor="containerArchitecture">
              Container Architecture
            </label>
            <select
              name="containerArchitecture"
              id="containerArchitecture"
              onChange={(e) => setContArch(e.target.value)}
            >
              <option value="linux/amd64">linux/amd64</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div className="formField">
              <label htmlFor="mapServer">Map Server</label>
              <input
                type="text"
                id="mapServer"
                name="mapServer"
                onChange={(e) => setMapServer(e.target.value)}
                value={mapServer}
              />
            </div>
            <div className="formField">
              <label htmlFor="mapServerTo">Map Server To</label>
              <input
                type="text"
                id="mapServerTo"
                name="mapServerTo"
                onChange={(e) => setMapServerTo(e.target.value)}
                value={mapServerTo}
              />
            </div>
          </div>
        </div>
        <div className="commandToRun">
          <label htmlFor="command">Command To Run</label>
          <textarea
            name="command"
            id="command"
            style={{
              width: "100%",
              fontFamily: "monospace",
              fontSize: "10px",
              padding: "5px 10px",
              backgroundColor: "#333",
              color: "gold",
              border: "none",
              resize: "none",
            }}
            readOnly
            value={command}
            rows={3}
          />
        </div>
        <button type="submit">Run</button>
      </form>
      <div>
        <label htmlFor="display">Display</label>
        <div id="display" style={{ display: "flex", gap: "1rem" }}>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <label htmlFor="file">File</label>
            <input
              checked={displayFile === true}
              type="radio"
              id="file"
              name="file_content"
              value="file"
              onChange={() => {
                handleDisplayChange("file");
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <label htmlFor="response">Response</label>
            <input
              checked={displayFile === false}
              type="radio"
              id="response"
              name="file_content"
              value="response"
              onChange={() => {
                handleDisplayChange("response");
              }}
            />
          </div>
        </div>
      </div>
      <textarea
        className={isError ? "response error" : "response success"}
        readOnly
        name="response"
        id="response"
        rows={20}
        value={displayFile ? fileContent : response}
      />
    </div>
  );
}

export default App;

/* <div className="chartCardWrapper">
        <div className="chartCard">
          <BaseChart
            title="CPU Usage"
            data={statistics.map((val) => ({
              value: Math.floor(val.cpuUsage * 100),
            }))}
          ></BaseChart>
        </div>
        <div className="chartCard">
          <BaseChart
            title="Ram Usage"
            data={statistics.map((val) => ({
              value: Math.floor(val.ramUsgae * 100),
            }))}
          ></BaseChart>
        </div>
        <div className="chartCard">
          <BaseChart
            title="Storage Usage"
            data={statistics.map((val) => ({
              value: Math.floor(val.storageUsage * 100),
            }))}
          ></BaseChart>
        </div>
      </div> */
