import { JsonEditorsProvider, useGetJsonEditorsData, useJsonEditorsContext, useUpdateJsonEditorsContext } from "./components/Context";
import JsonEditor, {JsonEditorDependencies} from "./components/JsonEditor";

export default JsonEditor
export {
    JsonEditorDependencies,
    useJsonEditorsContext,
    useUpdateJsonEditorsContext,
    useGetJsonEditorsData,
    JsonEditorsProvider
}
