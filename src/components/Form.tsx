import React, { useState } from 'react';
import Prefill from "./Prefill";
import { FormProps } from '../types';

function Form({formNode}: FormProps) {
    const [showPrefill, setShowPrefill] = useState(false);
    return (
        <>
            <button key={formNode.id} id="form" onClick={() => setShowPrefill(true)}>
                <b>{formNode.name}</b>
            </button>
            {showPrefill && (
                <Prefill 
                    form_id={formNode.id} 
                    component={formNode.component} 
                    onClose={() => setShowPrefill(false)}
                />
            )}
        </>
    );
}

export default Form;