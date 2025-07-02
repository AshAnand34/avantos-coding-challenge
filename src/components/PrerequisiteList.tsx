import { Button } from "react-bootstrap";
import { FormComponentProps } from "../types";
import { Dispatch, SetStateAction } from "react";

type PrerequisiteProps = FormComponentProps & {
    selectedField: string;
    setSelectedField: Dispatch<SetStateAction<string>>;
}

function PrerequisiteList({form_id, form_name, component, prerequisiteComponents, selectedField, setSelectedField} : PrerequisiteProps) {
    return (
        <div key={form_id} id="prerequisite-list">
            {Object.entries(prerequisiteComponents).map(([formName, fields]) => (
                <div key={formName}>
                    <div>{formName}</div>
                    <div style={{ marginLeft: 16 }}>
                        {fields.map((field) => (
                            field.all_fields.map((val) => <div key={val}><Button disabled={selectedField === val} onClick={() => setSelectedField(val)}>{val}</Button></div>)
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PrerequisiteList;