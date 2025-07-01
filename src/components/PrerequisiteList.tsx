import { Button } from "react-bootstrap";
import { FormComponentProps } from "../types";
import { Dispatch, SetStateAction } from "react";

type PrerequisiteProps = FormComponentProps & {
    selectedField: string;
    setSelectedField: Dispatch<SetStateAction<string>>;
}

function PrerequisiteList({form_id, component, prerequisiteComponents, selectedField, setSelectedField} : PrerequisiteProps) {
    return (
        <div key={form_id} id="prerequisite-list">
            {Object.entries(prerequisiteComponents).map(([form_name, fields]) => (
                <div key={form_name}>
                    <div>{form_name}</div>
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