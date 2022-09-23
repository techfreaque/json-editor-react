import React from 'react';
import JsonEditorsExample from './AccidentExample';
import {schema, startval} from './AccidentExample.data';

export default {
    title: 'Examples/Accident Example',
    component: JsonEditorsExample,
    parameters: { 
    }
};

const Template = (args) => (<JsonEditorsExample {...args} />);

export const AccidentExample = Template.bind({});
AccidentExample.args = {
    editorName: "Editor-1",
    schema: schema,
    startval: startval,
    theme: "bootstrap4",
    ajax: false,
    ajaxBase: undefined,
    ajaxCredentials: false,
    ajax_cache_responses: false,
    ajax_cache_buster: undefined,
    compact: false,
    disable_array_add: false,
    disable_array_delete: false,
    disable_array_delete_all_rows: false,
    disable_array_delete_last_row: false,
    disable_array_reorder: true,
    enable_array_copy: false,
    disable_collapse: false,
    disable_edit_json: false,
    disable_properties: true,
    array_controls_top: false,
    form_name_root: "root",
    iconlib: "spectre",
    remove_button_labels: false,
    no_additional_properties: true,
    refs: {},
    required_by_default: false,
    keep_oneof_values: true,
    show_errors: "interaction",
    template: "default",
    display_required_only: false,
    show_opt_in: false,
    prompt_before_delete: true,
    object_layout: "grid",
    onChange: undefined,
    enum_source_value_auto_select: true,
    max_depth: 0,
    use_default_values: true,
    urn_resolver: undefined,
    use_name_attributes: true,
    style: {},
};
