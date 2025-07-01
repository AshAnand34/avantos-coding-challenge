import { FormComponent, FormNode } from "../types";

function getNodes(data: any, formComponents: FormComponent[]) {
    const nodesJson = data["nodes"];
    let nodeForms: FormNode[] = [];
    for (let i = 0; i < nodesJson.length; i++) {
        let curr_node = nodesJson[i];
        nodeForms.push({
            id: curr_node.id,
            name: curr_node.data.name,
            prerequisites: curr_node.data.prerequisites,
            component: formComponents.find((val) => val.component_id === curr_node.data.component_id)!,
            is_clicked: false
        });
    }
    return nodeForms;
}

function getComponents(data: any) {
    const formsJson = data["forms"];
    let formComponents: FormComponent[] = [];

    for (let i = 0; i < formsJson.length; i++) {
        let curr_form = formsJson[i];
        formComponents.push({
            component_id: curr_form.id,
            name: curr_form.name,
            dynamic_fields: Object.keys(curr_form.dynamic_field_config)
        });
    }

    return formComponents;
}

export {getNodes, getComponents}