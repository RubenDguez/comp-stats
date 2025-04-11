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
    const TEST_FILE_PATH =
        "/Users/argenisdominguez/Documents/sandbox/electron/comp-stats/.github/workflows/test.yaml";
    const RUNNING_MESSAGE = "Running...";
    const DEFAULT_CONTAINER_ARCH = "linux/amd64";

    const [response, setResponse] = useState<string>("");
    const [ymlContent, setYamlContent] = useState<string>("");
    const [jsonContent, setJsonContent] = useState<IJson | null>(null);
    const [command, setCommand] = useState<string>("");
    const [filePath, setFilePath] = useState<string>(TEST_FILE_PATH);
    const [contArch, setContArch] = useState<string>(DEFAULT_CONTAINER_ARCH);
    const [isError, setIsError] = useState<boolean>(false);
    const [mapServer, setMapServer] = useState<string>("");
    const [mapServerTo, setMapServerTo] = useState<string>("ubuntu");
    const [displayFile, setDisplayFile] = useState<boolean>(false);
    const [value, setValue] = useState("1");
    const [on, setOn] = useState<string>("");
    const [jobs, setJobs] = useState<Array<string> | null>(null);

    const formRef = useRef<HTMLFormElement>(null);

    const isLoading = useMemo(() => {
        return response === RUNNING_MESSAGE;
    }, [response]);

    /**
     * On Computed Values
     * @description
     * This function computes the values of the `on` property in the GitHub workflow file.
     * And returns the values and the currently selected value.
     */
    const onComputedValues = useMemo(() => {
        const selectedValue = GitHub.triggers.filter((f) => f.on === on)[0];

        if (!jsonContent) return { values: [], selectedValue };

        const isArray = Array.isArray(jsonContent.on);
        const isString = typeof jsonContent.on[0] === "string";
        const vals =
            isArray && isString
                ? (jsonContent.on as string[]).map((m) => m)
                : Object.keys(jsonContent.on);

        const values = GitHub.triggers.filter((f) => vals.includes(f.on));

        return { values, selectedValue };
    }, [jsonContent, on]);

    /**
     * Handle Tab Change
     * @param {React.SyntheticEvent} _event
     * @param {string} activeTab
     * @description
     * This function handles the change of the tab in the UI.
     */
    const handleTabChange = (_event: React.SyntheticEvent, activeTab: string) => {
        setValue(activeTab);
    };

    /**
     * Load File Content
     * @description
     * This function loads the content of the file from the file path.
     */
    const loadFileContent = useCallback(async () => {
        try {
            const { raw, json } = await window.electron.loadFile(filePath);
            const on: Array<string> =
                Array.isArray(json.on) && typeof json.on[0] === "string"
                    ? (json.on as string[]).map((m) => m)
                    : Object.keys(json.on);

            const values = GitHub.triggers.filter((f) => on.includes(f.on));

            setYamlContent(raw);
            setJsonContent(json);
            setOn(values[0].on);
        } catch (error) {
            setYamlContent((error as Error).message);
            setJsonContent(null);
        }
    }, [filePath]);

    /**
     * Handle Form Action
     * @param {React.FormEvent<HTMLFormElement>} e
     * @description
     * This function handles the form submission and executes the command.
     * The command to execute is built based on the values in the form.
     */
    const handleFormAction = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            let response: string = "";

            e.preventDefault();

            // reset the state values to default values
            setValue("1");
            setResponse(RUNNING_MESSAGE);
            setIsError(false);
            setJobs(null);
            loadFileContent();

            try {
                response = await window.electron.exec(command);
            } catch (error) {
                setIsError(true);
                response = (error as Error).message;
            }

            setResponse(response);
            setJobs(Object.keys(jsonContent!.jobs));
        },
        [command, jsonContent, loadFileContent]
    );

    /**
     * Set the command to execute
     * @description
     * This function sets the command to execute based on the values in the form.
     */
    useEffect(() => {
        setCommand(
            mapServer !== ""
                ? `act ${on} -W '${filePath}' --container-architecture ${contArch} -P ${mapServer}=${mapServerTo}`
                : `act ${on} -W '${filePath}' --container-architecture ${contArch}`
        );
    }, [filePath, on, contArch, mapServer, mapServerTo]);

    /**
     * Load the file content when the component mounts
     * @description
     * This function loads the file content when the component mounts.
     */
    useEffect(() => {
        loadFileContent();
    }, [loadFileContent, filePath]);

    return {
        getters: {
            isLoading,
            command,
            response,
            ymlContent,
            filePath,
            on,
            contArch,
            isError,
            mapServer,
            mapServerTo,
            displayFile,
            value,
            onComputedValues,
            jsonContent,
            jobs,
        },
        setters: {
            setResponse,
            setYamlContent,
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
            handleFormAction,
            handleTabChange,
        },
        statics: {
            RUNNING_MESSAGE,
        },
    };
};

export default useMain;
