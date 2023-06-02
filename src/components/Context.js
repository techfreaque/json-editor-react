import React, {createContext, useContext, useState} from "react";

const JsonEditorsContext = createContext();
const UpdateJsonEditorsContext = createContext();

export const useJsonEditorsContext = () => {
    return useContext(JsonEditorsContext);
};

export const useUpdateJsonEditorsContext = () => {
    return useContext(UpdateJsonEditorsContext);
};

export const useGetJsonEditorsData = () => {
    const editors = useJsonEditorsContext()
    const newConfigs = {}
    Object.keys(editors).forEach((key) => {
        if (editors[key].ready) {
            newConfigs[key] = editors[key].getValue()
        }
    })
    return newConfigs
};

export const JsonEditorsProvider = ({children}) => {
    const [jsonEditors, setJsonEditors] = useState({});

    return (
        <JsonEditorsContext.Provider value={jsonEditors}>
            <UpdateJsonEditorsContext.Provider value={setJsonEditors}>
                {children} </UpdateJsonEditorsContext.Provider>
        </JsonEditorsContext.Provider>
    );
};
