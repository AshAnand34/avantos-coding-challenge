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

function getNodePrerequisites(formNodes: FormNode[], form_id: string) {
    let matching_node_prereqs: string[] = formNodes.filter((curr: FormNode) => curr.id === form_id)[0].prerequisites;
    let preReqNodes = formNodes.filter((curr: FormNode) => matching_node_prereqs.includes(curr.id));
    return preReqNodes;
}

function getPrerequisiteComponents(forms: FormNode[], prerequisites: FormNode[]) {
    let preReqComponents: {[form_name: string]: FormComponent[]} = {};

    for (let i = 0; i < forms.length; i++) {
        let curr_form = forms[i];
        if (
            curr_form.prerequisites.length === prerequisites.length &&
            curr_form.prerequisites.every((val) =>
                prerequisites.map((p) => p.id).includes(val)
            )
        ) {
            for (let j = 0; j < prerequisites.length; j++) {
                let curr_prereq = prerequisites[j];
                if (Object.keys(preReqComponents).includes(curr_prereq.name)){
                    preReqComponents[curr_prereq.name].push(curr_prereq.component)
                } else {
                    preReqComponents[curr_prereq.name] = [curr_prereq.component]
                }
            }
            break
        }
    }
    return preReqComponents;
}

function getComponents(data: any) {
    const formsJson = data["forms"];
    let formComponents: FormComponent[] = [];

    for (let i = 0; i < formsJson.length; i++) {
        let curr_form = formsJson[i];
        formComponents.push({
            component_id: curr_form.id,
            name: curr_form.name,
            dynamic_fields: Object.keys(curr_form.dynamic_field_config).filter((obj) => obj !== "button"),
            all_fields: Object.keys(curr_form.field_schema.properties).filter((obj) => obj !== "button")
        });
    }

    return formComponents;
}

export {getNodes, getComponents, getNodePrerequisites, getPrerequisiteComponents}