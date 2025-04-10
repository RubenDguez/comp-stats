import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

const useMain = () => {
  const RUNNING_MESSAGE = "Running...";
  const [response, setResponse] = useState<string>("");
  const [fileContent, setFileConent] = useState<string>("");
  const [command, setCommand] = useState<string>("");
  const [filePath, setFilePath] = useState<string>(
    "/Users/argenisdominguez/Documents/sandbox/electron/comp-stats/.github/workflows/test.yaml"
  );
  const [on, setOn] = useState<string>("push");
  const [contArch, setContArch] = useState<string>("linux/amd64");
  const [isError, setIsError] = useState<boolean>(false);
  const [mapServer, setMapServer] = useState<string>("");
  const [mapServerTo, setMapServerTo] = useState<string>("ubuntu");
  const [displayFile, setDisplayFile] = useState<boolean>(false);
  const [value, setValue] = useState("1");

  const formRef = useRef<HTMLFormElement>(null);

  const isLoading = useMemo(() => {
    return response === RUNNING_MESSAGE;
  }, [response]);

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
      RUNNING_MESSAGE
    }
  };
};

export default useMain;
