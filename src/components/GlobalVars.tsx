import { Dispatch, SetStateAction } from "react";
import { FormComponent } from "../types";
import { Button } from "react-bootstrap";

type GlobalVarsProps = {
    component: FormComponent;
    form_name: string;
    curr_component: string;
    selectedField: string;
    setSelectedField: Dispatch<SetStateAction<string>>;
}

function GlobalVars({component, form_name, curr_component, selectedField, setSelectedField}: GlobalVarsProps) {
    return (
        <div key={curr_component} id="global-var-list">
            Global Vars
            <div style={{ marginLeft: 16 }}>
                <Button disabled={selectedField === "value"} onClick={() => {setSelectedField("value");}}>value</Button>
            </div>
        </div>
    )
}

export default GlobalVars;