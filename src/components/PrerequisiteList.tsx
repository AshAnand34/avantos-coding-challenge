import { Button } from "react-bootstrap";
import { FormComponentProps } from "../types";

function PrerequisiteList({form_id, component, prerequisiteComponents} : FormComponentProps) {
    console.log(prerequisiteComponents);
    return (
        <div key={form_id} id="prerequisite-list">
            {Object.entries(prerequisiteComponents).map(([form_name, fields]) => (
                <div key={form_name}>
                    <div>{form_name}</div>
                    <div style={{ marginLeft: 16 }}>
                        {fields.map((field) => (
                            field.all_fields.map((val) => <div key={val}><Button>{val}</Button></div>)
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PrerequisiteList;