import React, { useState } from 'react';
import Prefill from "./Prefill";
import { FormProps } from '../types';

/**
 * Form component that renders a clickable form button and manages the Prefill modal
 * When clicked, it opens the Prefill component for field mapping configuration
 */
function Form({formNode, prerequisiteComponents}: FormProps) {
    // State to control whether the Prefill modal is shown
    const [showPrefill, setShowPrefill] = useState(false);
    
    // State to store field mappings (which fields are mapped to which values)
    const [prefillMapping, setPrefillMapping] = useState<{
        [key: string]: string | null;
    }>({});
    
    return (
        <>
            {/* Clickable form button that opens the Prefill modal */}
            <button key={formNode.id} id="form" onClick={() => setShowPrefill(true)}>
                <b>{formNode.name}</b>
            </button>
            
            {/* Conditionally render the Prefill component when showPrefill is true */}
            {showPrefill && (
                <Prefill 
                    form_id={formNode.id}
                    form_name={formNode.name}
                    component={formNode.component}
                    onClose={() => setShowPrefill(false)}
                    prerequisiteComponents={prerequisiteComponents}
                    prefillMapping={prefillMapping}
                    setPrefillMapping={setPrefillMapping}
                />
            )}
        </>
    );
}

export default Form;