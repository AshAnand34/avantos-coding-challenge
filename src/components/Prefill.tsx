import { FormComponentProps } from "../types";

// Extend props to include onClose
interface PrefillProps extends FormComponentProps {
    onClose: () => void;
}

function Prefill({form_id, component, onClose} : PrefillProps) {
    return (
        <div key={form_id} id="prefill">
            <h3>Prefill</h3>
            <input type="checkbox" id="prefill" name="prefill_elements"/>
            <label htmlFor="prefill">Prefill fields for this form</label>
            {component.dynamic_fields.map((val) => <div>{val}</div>)}
            <button onClick={onClose}>Close</button>
        </div>
    )
}

export default Prefill;