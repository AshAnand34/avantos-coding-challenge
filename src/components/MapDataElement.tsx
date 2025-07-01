import { Modal, Button } from "react-bootstrap";
import { FormComponentProps } from "../types";
import PrerequisiteList from "./PrerequisiteList";

function MapDataElement({form_id, component, showMapDataElement, hideMapDataElement, prerequisiteComponents} : FormComponentProps) {
    return (
        <Modal centered key={form_id} id="map-data-element" show={showMapDataElement} onHide={hideMapDataElement} size="lg" aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header>
                <Modal.Title>Select data element to map</Modal.Title>
            </Modal.Header>
            <PrerequisiteList form_id={form_id} component={component} prerequisiteComponents={prerequisiteComponents} />
            <Modal.Body>
                <input type="checkbox" id="map-data-element" name="map_data_element"/>
                <label htmlFor="map-data-element">Map data element</label>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={hideMapDataElement}>Cancel</Button>
                <Button variant="primary">Select</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MapDataElement;