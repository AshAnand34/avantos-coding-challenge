import { Button, Form, InputGroup } from "react-bootstrap";
import { FormComponentProps } from "../types";
import MapDataElement from "./MapDataElement";
import { useState, useEffect } from "react";

interface PrefillProps extends FormComponentProps {
    onClose: () => void;
    prefillMapping: {
        [key: string]: string | null;
    }
    setPrefillMapping: (mapping: {
        [key: string]: string | null;
    }) => void;
}

function Prefill({form_id, component, onClose, prerequisiteComponents, prefillMapping, setPrefillMapping} : PrefillProps) {
    const [showMapDataElement, setShowMapDataElement] = useState<boolean>(false);
    const hideMapDataElement = () => {
      setShowMapDataElement(false);
    };
    const handleClear = (field: string) => {
        setPrefillMapping({...prefillMapping, [field]: null});
    };
    const [clickedComponent, setClickedComponent] = useState<string>("");

    // Initialize prefillMapping with default values from prerequisites
    useEffect(() => {
        const initialMapping: { [key: string]: string | null } = { ...prefillMapping };
        component.all_fields.forEach((field) => {
            if (!initialMapping[field]) {
                // Search all prerequisiteComponents for a matching field
                for (const [formName, prereqList] of Object.entries(prerequisiteComponents)) {
                    for (const prereq of prereqList) {
                        if (prereq.all_fields.includes(field)) {
                            initialMapping[field] = `${formName}.${field}`;
                            break;
                        }
                    }
                    if (initialMapping[field]) break;
                }
            }
        });
        // Only update if mapping has changed
        if (JSON.stringify(initialMapping) !== JSON.stringify(prefillMapping)) {
            setPrefillMapping(initialMapping);
        }
    }, [component, prerequisiteComponents]);

    return (
        <>
            <div key={form_id} id="prefill">
                <h3>Prefill</h3>
                <InputGroup style={{width: "50%", textAlign: "center", justifyContent: "center", margin: "0 auto"}}>
                    <Form.Check type="checkbox" id="prefill" name="prefill_elements"/>
                    <Form.Label htmlFor="prefill">Prefill fields for this form</Form.Label>
                </InputGroup>
                <InputGroup style={{width: "50%", textAlign: "center", justifyContent: "center", margin: "0 auto"}}>
                    {component.all_fields.map((val) => 
                        prefillMapping[val] ? (
                            <div key={val}>
                                {val}: {prefillMapping[val]}
                                <button onClick={() => handleClear(val)}>X</button>
                            </div>
                        ): (
                            <div key={val}>
                                <Button variant="primary" onClick={() => {setClickedComponent(val); setShowMapDataElement(true)}}>{val}</Button>
                            </div>
                        )
                    )}
                </InputGroup>
                <Button variant="secondary" onClick={onClose}>Close</Button>
            </div>
            <MapDataElement 
                form_id={form_id} 
                component={component}
                curr_component={clickedComponent}
                showMapDataElement={showMapDataElement}
                hideMapDataElement={hideMapDataElement}
                prerequisiteComponents={prerequisiteComponents}
            />
        </>
    )
}

export default Prefill;