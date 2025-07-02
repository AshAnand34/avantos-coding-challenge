/**
 * TypeScript type definitions for the form mapping application
 */

/**
 * Represents a form node in the blueprint graph
 * Contains form metadata and its component definition
 */
export type FormNode = {
    id: string; // Unique identifier for the form
    name: string; // Display name of the form (e.g., "Form A")
    component: FormComponent; // The form's component definition
    prerequisites: string[]; // Array of form IDs that must be completed first
    is_clicked: boolean; // UI state to track if form has been clicked
}

/**
 * Represents a form component with its field definitions
 * Contains all the fields and their configurations
 */
export type FormComponent = {
    component_id: string; // Unique identifier for the component
    name: string; // Component name
    dynamic_fields: string[]; // Fields that can be dynamically configured
    all_fields: string[]; // All field names in the form
    all_field_values: any[]; // Field configurations and metadata
}

/**
 * Props for the Form component
 * Contains the form node and its prerequisite components
 */
export type FormProps = {
    formNode: FormNode; // The form to render
    prerequisiteComponents: {[form_name: string]: FormComponent[]}; // Available prerequisite forms
}

/**
 * Common props for form-related components
 * Used by Prefill, MapDataElement, and other form components
 */
export type FormComponentProps = {
    form_id: string; // Form identifier
    form_name: string; // Form display name
    component: FormComponent; // Form component definition
    curr_component?: string; // Currently selected field
    onClose?: () => void; // Function to close modal/component
    showMapDataElement?: boolean; // Whether mapping modal is visible
    setShowMapDataElement?: (show: boolean) => void; // Function to show/hide mapping modal
    hideMapDataElement?: () => void; // Function to hide mapping modal
    prerequisiteComponents: {[form_name: string]: FormComponent[]}; // Available prerequisite forms
    prefillMapping: { // Current field mappings
        [key: string]: string | null;
    },
    setPrefillMapping: (mapping: { // Function to update field mappings
        [key: string]: string | null;
    }) => void;
}