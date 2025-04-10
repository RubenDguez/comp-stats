import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import GitHub from "../constants/GitHub";

const useMain = () => {
  const RUNNING_MESSAGE = "Running...";
  const [response, setResponse] = useState<string>("");
  const [fileContent, setFileConent] = useState<string>("");
  const [fileContentJson, setFileConentJson] = useState<IYaml | null>(null);
  const [command, setCommand] = useState<string>("");
  const [filePath, setFilePath] = useState<string>(
    "/Users/argenisdominguez/Documents/sandbox/electron/comp-stats/.github/workflows/test.yaml"
  );
  const [contArch, setContArch] = useState<string>("linux/amd64");
  const [isError, setIsError] = useState<boolean>(false);
  const [mapServer, setMapServer] = useState<string>("");
  const [mapServerTo, setMapServerTo] = useState<string>("ubuntu");
  const [displayFile, setDisplayFile] = useState<boolean>(false);
  const [value, setValue] = useState("1");

  const [on, setOn] = useState<string>("");

  const formRef = useRef<HTMLFormElement>(null);

  const isLoading = useMemo(() => {
    return response === RUNNING_MESSAGE;
  }, [response]);

  const onVals = useMemo(() => {
    let values: Array<IGitHubTriggers> = [];

    if (fileContentJson && fileContentJson.on) {
      const vals = 
      Array.isArray(fileContentJson.on) && typeof fileContentJson.on[0] === 'string'
      ? (fileContentJson.on as string[]).map((m) => m)
      : Object.keys(fileContentJson.on);

      values = GitHub.triggers.filter((f) => (vals.includes(f.on)));
    }
    

    const selectedValue = GitHub.triggers.filter((f) => f.on === on)[0];
    return { values, selectedValue };
  }, [fileContentJson, on]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

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
      setValue("1");
      setResponse(RUNNING_MESSAGE);
      setIsError(false);

      let response: string = "";

      try {
        response = await window.electron.exec(command);
      } catch (error) {
        setIsError(true);
        response = (error as Error).message;
      }

      setResponse(response);
    },
    [command]
  );

  useEffect(() => {
    setCommand(
      mapServer !== ""
        ? `act ${on} -W '${filePath}' --container-architecture ${contArch} -P ${mapServer}=${mapServerTo}`
        : `act ${on} -W '${filePath}' --container-architecture ${contArch}`
    );
  }, [filePath, on, contArch, mapServer, mapServerTo]);

  useEffect(() => {
    const readYmlAsJson = async () => {
      try {
        const fileCont = await window.electron.exec(`cat ${filePath}`);
        setFileConent(fileCont);

        const json = await window.electron.ymlToJson(filePath);
        const on: Array<string> = Array.isArray(json.on) && typeof json.on[0] === 'string'
          ? (json.on as string[]).map((m) => m)
          : Object.keys(json.on);

        const values = GitHub.triggers.filter((f) => on.includes(f.on));
        setFileConentJson(json);
        setOn(values[0].on);
      } catch (error) {
        setFileConent((error as Error).message);
      }
    };

    readYmlAsJson();
  }, [filePath]);

  return {
    getters: {
      isLoading,
      command,
      response,
      fileContent,
      filePath,
      on,
      contArch,
      isError,
      mapServer,
      mapServerTo,
      displayFile,
      value,
      onVals,
    },
    setters: {
      setResponse,
      setFileConent,
      setFilePath,
      setOn,
      setContArch,
      setIsError,
      setMapServer,
      setMapServerTo,
      setDisplayFile,
      setValue,
    },
    refs: {
      formRef,
    },
    actions: {
      handleDisplayChange,
      handleFormAction,
      handleTabChange,
    },
    statics: {
      RUNNING_MESSAGE,
    },
  };
};

export default useMain;
