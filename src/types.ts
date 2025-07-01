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
    dynamic_fields: string[]
}

export type FormProps = {
    formNode: FormNode
}

export type FormComponentProps = {
    form_id: string;
    component: FormComponent;
} 

