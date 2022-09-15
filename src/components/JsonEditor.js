import {useEffect} from "react";
import {Helmet} from "react-helmet";
import {JsonEditorsProvider, useJsonEditorsContext, useUpdateJsonEditorsContext} from "./Context";

export function JsonEditorDependencies({children}) {
    return (<JsonEditorsProvider>
        <Helmet>
            <script src="https://cdn.jsdelivr.net/npm/@json-editor/json-editor@latest/dist/jsoneditor.min.js"/>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@json-editor/json-editor@latest/dist/css/jsoneditor.min.css"/>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/spectre.css@latest/dist/spectre-icons.min.css"/>
        </Helmet>
        {children} </JsonEditorsProvider>);
}

export default function JsonEditor({data, editorName}) {
    // data should be in this format
    // {
    //     schema: schema,
    //     startval: config,
    //     no_additional_properties: true,
    //     prompt_before_delete: true,
    //     disable_array_reorder: true,
    //     disable_collapse: false,
    //     disable_properties: true,
    //     theme: 'bootstrap4',
    //     iconlib: "spectre",
    //     object_layout: "grid"
    // }
    const HtmlEditorId = "json-editor-" + editorName;
    const setEditors = useUpdateJsonEditorsContext()
    const editors = useJsonEditorsContext()
    function setEditor(tentacleName, newEditor) {
        setEditors(prevEditors => ({
            ...prevEditors,
            [tentacleName]: newEditor
        }))
    }
    function createEditor(editor, data) {
        editor instanceof window.JSONEditor && editor.destroy();
        const editorElement = document.getElementById(HtmlEditorId)
        setEditor(editorName, new window.JSONEditor(editorElement, {
            no_additional_properties: true,
            prompt_before_delete: true,
            disable_array_reorder: true,
            disable_collapse: false,
            disable_properties: true,
            theme: 'bootstrap4',
            iconlib: "spectre",
            object_layout: "grid",
            ... data
        }));
    }
    useEffect(() => {
        data.schema && createEditor(editors[editorName], data);
    }, [data, editorName]);
    return (<div id={HtmlEditorId}></div>)
}
