type JSONEditorOptions<TValue, TSchema> = {
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
type JSONEditorError = {
    path: string;
    property: string;
    message: string;
};
type JSONEditorObjectOptions = {
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
type JSONEditorArrayOptions = {
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

declare class JSONEditorTheme {
    constructor();
    public getButton(
        text: HTMLElement,
        icon: HTMLElement,
        title: string
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

declare class JSONEditor<TValue, TSchema> {
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
            bootstrap5: typeof JSONEditorTheme;
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
    public on(event: string, fn: () => void): JSONEditor<TValue, TSchema>;
    public off(event: string, fn: () => void): JSONEditor<TValue, TSchema>;
    public watch(event: string, fn: () => void): JSONEditor<TValue, TSchema>;
    public unwatch(event: string, fn: () => void): JSONEditor<TValue, TSchema>;
    public validate(value?: TValue): JSONEditorError[];
    public setValue(value: TValue): void;
    public getValue(): TValue;
    public getEditor(name: string): JSONEditor<TValue, TSchema>;
    public disable(): void;
    public enable(): void;
    public isEnabled(): boolean;
    public destroy(): void;
}

declare module '@json-editor/json-editor' {
    export { JSONEditor };
}
