import { Modal, Button } from "react-bootstrap";
import { FormComponentProps } from "../types";
import PrerequisiteList from "./PrerequisiteList";
import GlobalVars from "./GlobalVars";
import { useCallback, useEffect, useState } from "react";

/**
 * MapDataElement component - Modal for mapping form fields to data sources
 * Allows users to select a data source (Global Vars or Prerequisites) and set values
 */
function MapDataElement({form_id, form_name, component, curr_component, showMapDataElement, hideMapDataElement, prerequisiteComponents, prefillMapping, setPrefillMapping} : FormComponentProps) {
    // State to track which data source is selected (from left panel)
    const [selectedField, setSelectedField] = useState<string>("");
    
    // State to store the input value for the selected field
    const [inputValue, setInputValue] = useState<string>("");

    /**
     * Renders the appropriate input component based on the field type
     * Supports different input types: text, textarea, multi-select, etc.
     */
    const renderInputForField = useCallback((field: any, onChange: (e: React.ChangeEvent<any>) => void) => {
        switch (field.avantos_type) {
            case "short-text":
                return <input type="text" value={inputValue} onChange={onChange} />;
            case "multi-line-text":
                return <textarea value={inputValue} onChange={onChange} />;
            case "checkbox-group":
                return (
                    <select multiple value={inputValue ? inputValue.split(",") : []} onChange={onChange}>
                        {field.items?.enum?.map((option: any) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                );
            case "multi-select":
                return (
                    <select multiple value={inputValue ? inputValue.split(",") : []} onChange={onChange}>
                        {field.items?.enum?.map((option: any) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                );
            default:
                return <input type="text" value={inputValue} onChange={onChange}/>;
        }
    }, [inputValue]);

    // Update inputValue when selectedField, curr_component, prefillMapping, or form_name changes
    useEffect(() => {
        if (!selectedField) return;
        // Create the mapping key in format: form_name.curr_component.selectedField
        const key = [form_name, curr_component, selectedField].join('.');
        // Load existing value if it exists, otherwise use empty string
        setInputValue(prefillMapping[key] || "");
    }, [curr_component, prefillMapping, selectedField, form_name]);

    /**
     * Handles input changes for different input types
     * For multi-select inputs, joins selected values with commas
     */
    const handleInputChange = (e: React.ChangeEvent<any>) => {
        if (e.target.type === "select-multiple") {
            const selected = Array.from(e.target.selectedOptions, (option: any) => option.value);
            setInputValue(selected.join(","));
        } else {
            setInputValue(e.target.value);
        }
    };

    /**
     * Handles the Select button click
     * Saves the mapping and closes the modal
     */
    const handleSelect = () => {
        if (selectedField) {
            // Create the mapping key and save the value
            setPrefillMapping({ ...prefillMapping, [[form_name, curr_component, selectedField].join('.')]: inputValue });
            setSelectedField("");
            hideMapDataElement!();
        }
    };
    
    return (
        <Modal centered key={form_id} id="map-data-element" show={showMapDataElement} onHide={hideMapDataElement} size="lg" style={{display: 'flex'}} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header>
                <Modal.Title>Select data element to map for {curr_component}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ display: "flex", flexDirection: "row"}}>
                    {/* Left panel: Data source selection */}
                    <div style={{ flex: 1 }} key="select-vars">
                        {/* Global variables section */}
                        <GlobalVars component={component} form_name={form_name} curr_component={curr_component!} selectedField={selectedField} setSelectedField={setSelectedField} />
                        {/* Prerequisites section */}
                        <PrerequisiteList form_id={form_id} form_name={form_name} component={component} prerequisiteComponents={prerequisiteComponents} selectedField={selectedField} setSelectedField={setSelectedField} prefillMapping={prefillMapping} setPrefillMapping={setPrefillMapping}/>
                    </div>
                    
                    {/* Right panel: Value input (only shown when a field is selected) */}
                    <div style={{ flex: 1 }} key="set-values">
                        {selectedField !== "" && renderInputForField(
                            component.all_field_values[component.all_fields.indexOf(curr_component!)],
                            handleInputChange
                        )}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                {/* Cancel button - clears selection and closes modal */}
                <Button variant="secondary" onClick={() => {setSelectedField(""); hideMapDataElement!();}}>Cancel</Button>
                {/* Select button - saves the mapping */}
                <Button variant="primary" onClick={handleSelect}>Select</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MapDataElement;