import { Modal, Button } from "react-bootstrap";
import { FormComponentProps } from "../types";
import PrerequisiteList from "./PrerequisiteList";
import GlobalVars from "./GlobalVars";
import { useState } from "react";

function renderInputForField(field: any) {
    switch (field.avantos_type) {
      case "short-text":
        return <input type="text" />;
      case "multi-line-text":
        return <textarea />;
      case "checkbox-group":
      case "multi-select":
        return (
          <select multiple>
            {field.items?.enum?.map((option: any) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      default:
        return <input type="text" />;
    }
  }

function MapDataElement({form_id, component, curr_component, showMapDataElement, hideMapDataElement, prerequisiteComponents} : FormComponentProps) {
    const [selectedField, setSelectedField] = useState<string>("");
    return (
        <Modal centered key={form_id} id="map-data-element" show={showMapDataElement} onHide={hideMapDataElement} size="lg" style={{display: 'flex'}} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header>
                <Modal.Title>Select data element to map</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ display: "flex", flexDirection: "row"}}>
                    <div style={{ flex: 1 }}>
                        <GlobalVars component={component} curr_component={curr_component!} selectedField={selectedField} setSelectedField={setSelectedField} />
                        <PrerequisiteList form_id={form_id} component={component} prerequisiteComponents={prerequisiteComponents} selectedField={selectedField} setSelectedField={setSelectedField} />
                    </div>
                    <div style={{ flex: 1 }}>
                        {selectedField !== "" && renderInputForField(component.all_field_values[component.all_fields.indexOf(curr_component!)])}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {setSelectedField(""); hideMapDataElement!();}}>Cancel</Button>
                <Button variant="primary">Select</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MapDataElement;