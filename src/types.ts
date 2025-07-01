export type FormNode = {
    id: string;
    name: string;
    component: FormComponent;
    prerequisites: string[];
    is_clicked: boolean;
}

export type FormComponent = {
    component_id: string;
    name: string;
    dynamic_fields: string[];
    all_fields: string[];
    all_field_values: any[];
}

export type FormProps = {
    formNode: FormNode;
    prerequisiteComponents: {[form_name: string]: FormComponent[]};
}

export type FormComponentProps = {
    form_id: string;
    component: FormComponent;
    curr_component?: string;
    onClose?: () => void;
    showMapDataElement?: boolean;
    setShowMapDataElement?: (show: boolean) => void;
    hideMapDataElement?: () => void;
    prerequisiteComponents: {[form_name: string]: FormComponent[]};
}