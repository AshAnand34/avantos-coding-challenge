import { Dispatch, SetStateAction } from "react";
import { FormComponent } from "../types";
import { Button } from "react-bootstrap";

/**
 * Props interface for the GlobalVars component
 */
type GlobalVarsProps = {
    component: FormComponent;
    form_name: string;
    curr_component: string;
    selectedField: string;
    setSelectedField: Dispatch<SetStateAction<string>>;
}

/**
 * GlobalVars component - Displays global variables that can be mapped to form fields
 * Currently shows a "value" button that can be selected as a data source
 */
function GlobalVars({component, form_name, curr_component, selectedField, setSelectedField}: GlobalVarsProps) {
    return (
        <div key={curr_component} id="global-var-list">
            Global Vars
            <div style={{ marginLeft: 16 }}>
                {/* Global variable button - disabled when already selected */}
                <Button 
                    disabled={selectedField === "value"} 
                    onClick={() => {setSelectedField("value");}}
                >
                    value
                </Button>
            </div>
        </div>
    )
}

export default GlobalVars;