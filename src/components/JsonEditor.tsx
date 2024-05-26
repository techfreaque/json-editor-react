import React, { CSSProperties, useCallback, useMemo } from "react";
import { useEffect } from "react";
import "./JsonEditor.css";
import "select2/dist/css/select2.min.css";
import { JSONEditor } from "@json-editor/json-editor";

export default function JsonEditor<TStartValueType, TSchemaType>(
  props: JsonEditorProps<TStartValueType, TSchemaType>
) {
  const storageName: string = props.storageName
    ? `$${props.storageName}`
    : "$JsonEditors";
  const htmlEditorId: string = `json-editor-${storageName}-${props.editorName}`;

  const handleOnChange = useCallback(
    (
      editor: JSONEditor<TStartValueType, TSchemaType>,
      _onChange: ((editor: JSONEditor<TStartValueType, TSchemaType>) => void) | undefined
    ) => {
      function onChange() {
        if (editor?.didRunOnce) {
          _onChange?.(editor);
        } else {
          editor.didRunOnce = true;
        }
      }
      editor.on("change", onChange);
    },
    []
  );

  function createEditor(editorElement: HTMLDivElement) {
    const { onChange, customThemes, storageName: _, ...editorOptions } = props;
    let editor: JSONEditor<TStartValueType, TSchemaType> | undefined =
      window[storageName]?.[props.editorName];
    editor instanceof JSONEditor && editor.destroy();
    editorElement.innerHTML = "";

    if (customThemes) {
      customThemes.forEach((theme) => {
        JSONEditor.defaults.themes[theme.name] = theme.theme;
      });
    }
    JSONEditor.defaults.themes.octane = OctaneTheme;
    if (props.language) {
      JSONEditor.defaults.language = props.language;
    }
    if (props.languages) {
      JSONEditor.defaults.languages = {
        ...JSONEditor.defaults.languages,
        ...props.languages,
      };
    }
    editor = new JSONEditor<TStartValueType, TSchemaType>(editorElement, editorOptions);

    window[storageName] = {
      ...window[storageName],
      [props.editorName]: editor
    };

    handleOnChange(editor, onChange);
  }
  useEffect(() => {
    if (props.schema) {
      const editorElement: HTMLDivElement = document.getElementById(
        htmlEditorId
      ) as HTMLDivElement;
      if (editorElement) {
        const editor: JSONEditor<TStartValueType, TSchemaType> | undefined =
          window[storageName]?.[props.editorName];
        if (
          editor &&
          JSON.stringify(editor.schema) === JSON.stringify(props.schema)
        ) {
          if (editorElement?.children?.length) {
            editor.didRunOnce = false;
            try {
              editor.setValue(props.startval);
            } catch (e) {
              createEditor(editorElement);
            }
          } else {
            createEditor(editorElement);
          }
        } else {
          createEditor(editorElement);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);
  return useMemo(
    () => <div style={props.style} className="json-editor" id={htmlEditorId} />,
    [htmlEditorId, props.style]
  );
}

// custom octane theme
class OctaneTheme extends JSONEditor.defaults.themes.bootstrap4 {
  override getButton(text: HTMLElement, icon: HTMLElement, title: HTMLElement) {
    const el = super.getButton(text, icon, title);
    el.classList.remove("btn-secondary");
    el.classList.add("btn-sm", "btn-primary", "waves-effect");
    return el;
  }
  override getCheckbox() {
    const el = this.getFormInputField("checkbox");
    el.classList.add("custom-control-input");
    return el;
  }
  override getCheckboxLabel(text: HTMLElement) {
    const el = this.getFormInputLabel(text);
    el.classList.add("custom-control-label");
    return el;
  }
  override getFormControl(
    label: HTMLElement,
    input: HTMLInputElement,
    description: HTMLElement
  ) {
    const group = document.createElement("div");
    if (label && input.type === "checkbox") {
      group.classList.add("checkbox", "custom-control", "custom-switch");
      group.appendChild(input);
      group.appendChild(label);
    } else {
      group.classList.add("form-group");
      if (label) {
        label.classList.add("form-control-label");
        group.appendChild(label);
      }
      group.appendChild(input);
    }
    if (description) group.appendChild(description);
    return group;
  }
}

export type JsonEditorWindow = Window & {
  [storageName: string]: {
    [editorName: string]: JSONEditorClass<any, any>;
  };
};
declare const window: JsonEditorWindow;

export type JsonEditorType<TStartValueType, TSchemaType> = JSONEditorClass<TStartValueType, TSchemaType>

export interface JsonEditorProps<TStartValueType, TSchemaType> {
  // A unique name id that will be used as an id for the parent div (dont use spaces)
  editorName: string;

  // A name of the storage variable on window
  storageName?: string;

  // Allows you to change the language  default: "en"
  language?: string;

  // provide translated key values
  languages?: object;

  // If true, JSON Editor will load external URLs in $ref via ajax. 	false
  ajax?: boolean;

  // Allows schema references to work either with or without cors; set to protocol://host:port when api is served by different host.
  ajaxBase?: string;

  // If true, JSON Editor will make ajax call with [credentials](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials). 	false
  ajaxCredentials?: boolean;

  // If true, JSON Editor will cache external URLs' schemas in localStorage to avoid subsequent ajax calls. 	false
  ajax_cache_responses?: boolean;

  // If ajax_cache_responses is enabled, use this string to invalidate stale caches. E.g., this value should be changed when schemas are updated. 	Current date in simplified ISO-8601 format (e.g., "2011-10-05" for October 5, 2011).
  ajax_cache_buster?: string;

  // If true, the label will not be displayed/added. 	false
  compact?: boolean;

  // If true, remove all "add row" buttons from arrays. 	false
  disable_array_add?: boolean;

  // If true, remove all "delete row" buttons from arrays. 	false
  disable_array_delete?: boolean;

  // If true, remove all "delete all rows" buttons from arrays. 	false
  disable_array_delete_all_rows?: boolean;

  // If true, remove all "delete last row" buttons from arrays. 	false
  disable_array_delete_last_row?: boolean;

  // If true, remove all "move up" and "move down" buttons from arrays. 	false
  disable_array_reorder?: boolean;

  // If true, add copy buttons to arrays. 	false
  enable_array_copy?: boolean;

  // If true, remove all collapse buttons from objects and arrays. 	false
  disable_collapse?: boolean;

  // If true, remove all Edit JSON buttons from objects. 	false
  disable_edit_json?: boolean;

  // If true, remove all Edit Properties buttons from objects. 	false
  disable_properties?: boolean;

  // If true, array controls (add, delete etc) will be displayed at top of list. 	false
  array_controls_top?: boolean;

  // The first part of the `name` attribute of form inputs in the editor. An full example name is `root[person][name]` where "root" is the form_name_root. 	root
  form_name_root?: string;

  // The icon library to use for the editor. See the CSS Integration section below for more info. 	null
  iconlib?:
  | "jqueryui"
  | "fontawesome3"
  | "fontawesome4"
  | "fontawesome5"
  | "openiconic"
  | "spectre";

  // Display only icons in buttons. This works only if iconlib is set. 	false
  remove_button_labels?: boolean;

  // If true, objects can only contain properties defined with the properties keyword unless the property additionalProperties: true is specified in the object schema 	false
  no_additional_properties?: boolean;

  // An object containing schema definitions for URLs. Allows you to pre-define external schemas. 	{}
  refs?: object;

  // If true, all schemas that don't explicitly set the required property will be required. 	false
  required_by_default?: boolean;

  // If true, makes oneOf copy properties over when switching. 	true
  keep_oneof_values?: boolean;

  // A valid JSON Schema to use for the editor. Version 3 and Version 4 of the draft specification are supported. 	{}
  schema: TSchemaType;

  // When to show validation errors in the UI. Valid values are interaction, change, always, and never. 	"interaction"
  show_errors?: "interaction" | "change" | "always" | "never";

  // Seed the editor with an initial value. This should be valid against the editor's schema. 	null
  startval: TStartValueType;

  // The JS template engine to use. See the Templates and Variables section below for more info. 	default
  template?:
  | "default"
  | "ejs"
  | "handlebars"
  | "hogan"
  | "markup"
  | "mustache"
  | "swig"
  | "underscore";

  // The CSS theme to use. See the CSS Integration section below for more info. 	html
  theme?:
  | "html"
  | "barebones"
  | "bootstrap4"
  | "spectre"
  | "tailwind"
  | "octane";

  // If true, only required properties will be included by default. 	false
  display_required_only?: boolean;

  // If true, NON required properties will have an extra toggable checkbox near the title that determines if the value must be included or not in the editor´s value 	false
  show_opt_in?: boolean;

  customThemes?: {
    name: string;
    theme: typeof JSONEditorTheme;
  }[];

  // If true, displays a dialog box with a confirmation message before node deletion. 	true
  prompt_before_delete?: boolean;

  // The default value of `format` for objects. If set to table for example, objects will use table layout if `format` is not specified. 	normal
  object_layout?: "normal" | "table" | "grid" | undefined;

  // Pass a function that gets triggered when editor data changes
  onChange?: (editor: JSONEditor<TStartValueType, TSchemaType>) => void;

  // Preserve value at Move Up or Down.(No value is selected automatically upon deletion.) 	true
  enum_source_value_auto_select?: boolean;

  // Max depth of the nested properties to be rendered of provided json schema. The missing of this option could cause "maximum call stack size exceeded" in case of object properties with circular references. 0 value means "render all". 	0
  max_depth?: number;

  // If true default values based on the "type" of the property will be used 	true
  use_default_values?: boolean;

  // A callback function to resolve an undefined Uniform Resource Name (URN) for $ref. The function receives a URN and callback to pass back a serialized JSON response. The function should return a boolean (true if the URN can be resolved; false otherwise). 	false
  urn_resolver?: () => boolean;

  // use_name_attributes 	If true, control inputs name attributes will be set. 	true
  use_name_attributes?: boolean;

  // regular html style
  style?: CSSProperties;
}

const defaultProps: JsonEditorProps<any, any> = {
  ajax: false,
  ajaxCredentials: false,
  ajax_cache_responses: false,
  compact: false,
  disable_array_add: false,
  disable_array_delete: false,
  disable_array_delete_all_rows: false,
  disable_array_delete_last_row: false,
  disable_array_reorder: false,
  enable_array_copy: false,
  disable_collapse: false,
  disable_edit_json: false,
  disable_properties: false,
  array_controls_top: false,
  form_name_root: "root",
  remove_button_labels: false,
  no_additional_properties: false,
  refs: {},
  required_by_default: false,
  keep_oneof_values: true,
  schema: {},
  show_errors: "interaction",
  startval: null,
  style: {},
  template: "default",
  language: "en",
  theme: "octane",
  display_required_only: false,
  show_opt_in: false,
  prompt_before_delete: true,
  object_layout: "grid",
  enum_source_value_auto_select: true,
  max_depth: 0,
  use_default_values: true,
  use_name_attributes: true,
  editorName: "",
};

JsonEditor.defaultProps = defaultProps;

export type JSONEditorOptions<TValue, TSchema> = {
  /**
   * If true, JSON Editor will load external URLs in $ref via ajax.
   */
  ajax?: boolean | undefined;
  /**
   * If true, remove all "add row" buttons from arrays.
   */
  disable_array_add?: boolean | undefined;
  /**
   * If true, remove all "delete row" buttons from arrays.
   */
  disable_array_delete?: boolean | undefined;
  /**
   * If true, remove all "move up" and "move down" buttons from arrays.
   */
  disable_array_reorder?: boolean | undefined;
  /**
   * If true, remove all collapse buttons from objects and arrays.
   */
  disable_collapse?: boolean | undefined;
  /**
   * If true, remove all Edit JSON buttons from objects.
   */
  disable_edit_json?: boolean | undefined;
  /**
   * If true, remove all Edit Properties buttons from objects.
   */
  disable_properties?: boolean | undefined;
  /**
   * The first part of the `name` attribute of form inputs in the editor. An full example name is `root[person][name]` where "root" is the form_name_root.
   */
  form_name_root?: string | undefined;
  /**
   * The icon library to use for the editor.
   */
  iconlib?:
  | "bootstrap2"
  | "bootstrap3"
  | "foundation2"
  | "foundation3"
  | "jqueryui"
  | "fontawesome3"
  | "fontawesome4"
  | "fontawesome5"
  | "openiconic"
  | "spectre"
  | undefined;
  /**
   * If true, objects can only contain properties defined with the properties keyword.
   */
  no_additional_properties?: boolean | undefined;
  /**
   * An object containing schema definitions for URLs. Allows you to pre-define external schemas.
   */
  refs?: any;
  /**
   * If true, all schemas that don't explicitly set the required property will be required.
   */
  required_by_default?: boolean | undefined;
  /**
   * If true, makes oneOf copy properties over when switching.
   */
  keep_oneof_values?: boolean | undefined;
  /**
   * A valid JSON Schema to use for the editor. Version 3 and Version 4 of the draft specification are supported.
   */
  schema?: TSchema;
  /**
   * When to show validation errors in the UI. Valid values are interaction, change, always, and never.
   */
  show_errors?: "interaction" | "change" | "always" | "never" | undefined;
  /**
   * Seed the editor with an initial value. This should be valid against the editor's schema.
   */
  startval?: TValue | undefined;
  /**
   * The JS template engine to use.
   */
  template?:
  | string
  | { compile: (template: string) => (vars: any) => string; }
  | undefined;
  /**
   * The CSS theme to use.
   */
  theme?:
  | "barebones"
  | "html"
  | "bootstrap2"
  | "bootstrap3"
  | "octane"
  | "bootstrap4"
  | "foundation3"
  | "foundation4"
  | "foundation5"
  | "foundation6"
  | "jqueryui"
  | "spectre"
  | "tailwind"
  | undefined;
  /**
   * If true, only required properties will be included by default.
   */
  display_required_only?: boolean | undefined;

  object_layout?: "normal" | "table" | "grid" | undefined;
};
export type JSONEditorError = {
  path: string;
  property: string;
  message: string;
};
export type JSONEditorObjectOptions = {
  /**
   * If set to true, the editor will start collapsed
   */
  collapsed?: boolean | undefined;
  /**
   * If set to true, the collapse button will be hidden
   */
  disable_collapse?: boolean | undefined;
  /**
   * If set to true, the Edit JSON button will be hidden
   */
  disable_edit_json?: boolean | undefined;
  /**
   * If set to true, the Edit Properties button will be hidden
   */
  disable_properties?: boolean | undefined;
};
export type JSONEditorArrayOptions = {
  /**
   * If set to true, the editor will start collapsed
   */
  collapsed?: boolean | undefined;
  /**
   * If set to true, the "add row" button will be hidden
   */
  disable_array_add?: boolean | undefined;
  /**
   * If set to true, all of the "delete" buttons will be hidden
   */
  disable_array_delete?: boolean | undefined;
  /**
   * If set to true, just the "delete all rows" button will be hidden
   */
  disable_array_delete_all_rows?: boolean | undefined;
  /**
   * If set to true, just the "delete last row" buttons will be hidden
   */
  disable_array_delete_last_row?: boolean | undefined;
  /**
   * If set to true, the "move up/down" buttons will be hidden
   */
  disable_array_reorder?: boolean | undefined;
  /**
   * If set to true, the collapse button will be hidden
   */
  disable_collapse?: boolean | undefined;
};

export declare class JSONEditorTheme {
  constructor();
  public getButton(
      text: HTMLElement,
      icon: HTMLElement,
      title: HTMLElement
  ): HTMLElement;
  public getCheckbox(): HTMLElement;
  public getCheckboxLabel(text: HTMLElement): HTMLElement;
  public getFormControl(
      label: HTMLElement,
      input: HTMLInputElement,
      description: HTMLElement
  ): HTMLElement;
  public getFormInputField(type: "checkbox"): HTMLInputElement;
  public getFormInputLabel(text: HTMLElement): HTMLElement;
}

declare class JSONEditorClass<TValue, TSchema> {
  public didRunOnce?: boolean;
  public schema?: TSchema;
  public static defaults: {
      options: JSONEditorOptions<any, any>;
      editors: {
          object: {
              options: JSONEditorObjectOptions;
          };
          array: {
              options: JSONEditorArrayOptions;
          };
      };
      languages: any;
      language: string;
      resolvers: Array<(schema: any) => string>;
      custom_validators: Array<
          (schema: any, value: string, path: string) => JSONEditorError[]
      >;
      themes: {
          bootstrap4: typeof JSONEditorTheme;
          octane: typeof JSONEditorTheme;
          [theme: string]: typeof JSONEditorTheme;
      };
  };
  public static plugins: {
      sceditor: {
          emoticonsEnabled: boolean;
      };
      epiceditor: {
          basePath: string;
      };
      ace: {
          theme: string;
      };
      selectize: {
          enable: boolean;
      };
  };
  constructor(element: HTMLElement, options: JSONEditorOptions<TValue, TSchema>);
  public on(event: string, fn: () => void): JSONEditorClass<TValue, TSchema>;
  public off(event: string, fn: () => void): JSONEditorClass<TValue, TSchema>;
  public watch(event: string, fn: () => void): JSONEditorClass<TValue, TSchema>;
  public unwatch(event: string, fn: () => void): JSONEditorClass<TValue, TSchema>;
  public validate(value?: TValue): JSONEditorError[];
  public setValue(value: TValue): void;
  public getValue(): TValue;
  public getEditor(name: string): JSONEditorClass<TValue, TSchema>;
  public disable(): void;
  public enable(): void;
  public isEnabled(): boolean;
  public destroy(): void;
}