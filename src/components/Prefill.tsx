import { Button, Form, InputGroup } from "react-bootstrap";
import { FormComponentProps } from "../types";
import MapDataElement from "./MapDataElement";
import { useState, useEffect } from "react";

/**
 * Props interface for the Prefill component
 * Extends FormComponentProps with additional prefill-specific props
 */
interface PrefillProps extends FormComponentProps {
    onClose: () => void;
    prefillMapping: {
        [key: string]: string | null;
    }
    setPrefillMapping: (mapping: {
        [key: string]: string | null;
    }) => void;
}

/**
 * Prefill component that displays form fields and allows mapping them to data sources
 * Shows mapped fields with their values and clear buttons, unmapped fields as clickable buttons
 */
function Prefill({form_id, form_name, component, onClose, prerequisiteComponents, prefillMapping, setPrefillMapping} : PrefillProps) {
    // State to control the MapDataElement modal visibility
    const [showMapDataElement, setShowMapDataElement] = useState<boolean>(false);
    
    // Function to hide the mapping modal
    const hideMapDataElement = () => {
      setShowMapDataElement(false);
    };
    
    // Function to clear a mapped field by setting its value to null
    const handleClear = (field: string) => {
        setPrefillMapping({...prefillMapping, [field]: null});
    };
    
    // State to track which field component was clicked for mapping
    const [clickedComponent, setClickedComponent] = useState<string>("");

    // Initialize prefillMapping with default values from prerequisites
    useEffect(() => {
        const initialMapping: { [key: string]: string | null } = { ...prefillMapping };
        
        // For each field in the component
        component.all_fields.forEach((field) => {
            if (!initialMapping[field]) {
                // Search all prerequisiteComponents for a matching field
                for (const [formName, prereqList] of Object.entries(prerequisiteComponents)) {
                    for (const prereq of prereqList) {
                        if (prereq.all_fields.includes(field)) {
                            // Auto-map fields that exist in prerequisite forms
                            initialMapping[field] = `${formName}.${field}`;
                            break;
                        }
                    }
                    if (initialMapping[field]) break;
                }
            }
        });
        
        // Only update if mapping has changed to avoid infinite re-renders
        if (JSON.stringify(initialMapping) !== JSON.stringify(prefillMapping)) {
            setPrefillMapping(initialMapping);
        }
    }, [component, prerequisiteComponents]);

    return (
        <>
            <div key={form_id} id="prefill">
                <h3>Prefill</h3>
                {/* Container for field buttons/mappings */}
                <InputGroup style={{width: "50%", textAlign: "center", justifyContent: "center", margin: "0 auto"}}>
                    {component.all_fields.map((val) => 
                        prefillMapping[val] ? (
                            // Display mapped fields with their values and clear button
                            <div key={val}>
                                {val}: {prefillMapping[val]}
                                <button onClick={() => handleClear(val)}>X</button>
                            </div>
                        ): (
                            // Display unmapped fields as clickable buttons
                            <div key={val}>
                                <Button variant="primary" onClick={() => {setClickedComponent(val); setShowMapDataElement(true)}}>{val}</Button>
                            </div>
                        )
                    )}
                </InputGroup>
                {/* Close button to exit the Prefill view */}
                <Button variant="secondary" onClick={onClose}>Close</Button>
            </div>
            
            {/* Modal for mapping data elements to fields */}
            <MapDataElement 
                form_id={form_id} 
                form_name={form_name}
                component={component}
                curr_component={clickedComponent}
                showMapDataElement={showMapDataElement}
                hideMapDataElement={hideMapDataElement}
                prerequisiteComponents={prerequisiteComponents}
                prefillMapping={prefillMapping}
                setPrefillMapping={setPrefillMapping}
            />
        </>
    )
}

export default Prefill;