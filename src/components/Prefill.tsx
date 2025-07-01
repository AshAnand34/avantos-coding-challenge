import { Button, Form, InputGroup } from "react-bootstrap";
import { FormComponentProps } from "../types";
import MapDataElement from "./MapDataElement";
import { useState } from "react";

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
                                <button onClick={() => handleClear(val)} />
                            </div>
                        ): (
                            <div key={val}>
                                <Button variant="primary" onClick={() => {setShowMapDataElement(true)}}>{val}</Button>
                            </div>
                        )
                    )}
                </InputGroup>
                <Button variant="secondary" onClick={onClose}>Close</Button>
            </div>
            <MapDataElement 
                form_id={form_id} 
                component={component} 
                showMapDataElement={showMapDataElement}
                hideMapDataElement={hideMapDataElement}
                prerequisiteComponents={prerequisiteComponents}
            />
        </>
    )
}

export default Prefill;