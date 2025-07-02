import React, { useState } from 'react';
import Prefill from "./Prefill";
import { FormProps } from '../types';

function Form({formNode, prerequisiteComponents}: FormProps) {
    const [showPrefill, setShowPrefill] = useState(false);
    const [prefillMapping, setPrefillMapping] = useState<{
        [key: string]: string | null;
    }>({});
    return (
        <>
            <button key={formNode.id} id="form" onClick={() => setShowPrefill(true)}>
                <b>{formNode.name}</b>
            </button>
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