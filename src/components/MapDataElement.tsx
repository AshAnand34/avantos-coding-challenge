import { Modal, Button } from "react-bootstrap";
import { FormComponentProps } from "../types";
import PrerequisiteList from "./PrerequisiteList";
import GlobalVars from "./GlobalVars";
import { useCallback, useEffect, useState } from "react";


function MapDataElement({form_id, form_name, component, curr_component, showMapDataElement, hideMapDataElement, prerequisiteComponents, prefillMapping, setPrefillMapping} : FormComponentProps) {
    const [selectedField, setSelectedField] = useState<string>("");
    const [inputValue, setInputValue] = useState<string>("");

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
        const key = [form_name, curr_component, selectedField].join('.');
        setInputValue(prefillMapping[key] || "");
    }, [curr_component, prefillMapping, selectedField, form_name]);

    const handleInputChange = (e: React.ChangeEvent<any>) => {
        if (e.target.type === "select-multiple") {
            const selected = Array.from(e.target.selectedOptions, (option: any) => option.value);
            setInputValue(selected.join(","));
        } else {
            setInputValue(e.target.value);
        }
    };

    const handleSelect = () => {
        if (selectedField) {
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
                    <div style={{ flex: 1 }} key="select-vars">
                        <GlobalVars component={component} form_name={form_name} curr_component={curr_component!} selectedField={selectedField} setSelectedField={setSelectedField} />
                        <PrerequisiteList form_id={form_id} form_name={form_name} component={component} prerequisiteComponents={prerequisiteComponents} selectedField={selectedField} setSelectedField={setSelectedField} prefillMapping={prefillMapping} setPrefillMapping={setPrefillMapping}/>
                    </div>
                    <div style={{ flex: 1 }} key="set-values">
                        {selectedField !== "" && renderInputForField(
                            component.all_field_values[component.all_fields.indexOf(curr_component!)],
                            handleInputChange
                        )}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {setSelectedField(""); hideMapDataElement!();}}>Cancel</Button>
                <Button variant="primary" onClick={handleSelect}>Select</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MapDataElement;