import {useMemo} from "react";
import JsonEditor, {JsonEditorDependencies, useGetJsonEditorsData} from "@techfreaque/json-editor-react";

const editor1Data = {
    schema: {
        "type": "array",
        "title": "People",
        "format": "tabs",
        "items": {
          "title": "Person",
          "headerTemplate": "{{i}} - {{self.name}}",
          "oneOf": [
            {
              "$ref": "examples/basic_person.json",
              "title": "Basic Person"
            },
            {
              "$ref": "examples/person.json",
              "title": "Complex Person"
            }
          ]
        }
      },
    // optional
    startval: {
        "name": "John Smith",
        "age": 35,
        "gender": "male",
        "location": {
          "city": "San Francisco",
          "state": "California",
          "citystate": ""
        },
        "pets": [
          {
            "name": "Spot",
            "type": "dog",
            "fixed": true
          },
          {
            "name": "Whiskers",
            "type": "cat",
            "fixed": false
          }
        ]
      },
    no_additional_properties: true,
    prompt_before_delete: true,
    disable_array_reorder: true,
    disable_collapse: false,
    disable_properties: true,
    theme: 'bootstrap4',
    iconlib: "spectre",
    object_layout: "grid"
}

export default function ExampleEditors() {
    return (<JsonEditorDependencies>
        <RenderExampleEditors/>
    </JsonEditorDependencies>)

}
function RenderExampleEditors() {
    const jsonEditorsData = useGetJsonEditorsData();
    function useSaveEditors() {
        console.log("editorsData:", jsonEditorsData)
    };
    return useMemo(() => (<>
        <button onClick={useSaveEditors}>Save</button>
        <JsonEditor data={editor1Data}
            editorName={"Editor-1"}/>
    </>), [editor1Data])
}
