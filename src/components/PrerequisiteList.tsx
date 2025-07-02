import { Button } from "react-bootstrap";
import { FormComponentProps } from "../types";
import { Dispatch, SetStateAction } from "react";

/**
 * Props interface for the PrerequisiteList component
 * Extends FormComponentProps with field selection state management
 */
type PrerequisiteProps = FormComponentProps & {
    selectedField: string;
    setSelectedField: Dispatch<SetStateAction<string>>;
}

/**
 * PrerequisiteList component - Displays fields from prerequisite forms
 * Shows fields from forms that must be completed before the current form
 * Each field can be selected as a data source for mapping
 */
function PrerequisiteList({form_id, form_name, component, prerequisiteComponents, selectedField, setSelectedField} : PrerequisiteProps) {
    return (
        <div key={form_id} id="prerequisite-list">
            {/* Iterate through each prerequisite form */}
            {Object.entries(prerequisiteComponents).map(([formName, fields]) => (
                <div key={formName}>
                    <div>{formName}</div>
                    <div style={{ marginLeft: 16 }}>
                        {/* Iterate through each field in the prerequisite form */}
                        {fields.map((field) => (
                            field.all_fields.map((val) => (
                                <div key={val}>
                                    {/* Field button - disabled when already selected */}
                                    <Button 
                                        disabled={selectedField === val} 
                                        onClick={() => setSelectedField(val)}
                                    >
                                        {val}
                                    </Button>
                                </div>
                            ))
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PrerequisiteList;