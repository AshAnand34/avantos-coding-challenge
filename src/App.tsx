import React, { useEffect, useState } from 'react';
import { FormNode } from './types';
import { getComponents, getNodes, getPrerequisiteComponents, getNodePrerequisites } from './services/retrieve_blueprint';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './components/Form';

/**
 * Main App component that fetches blueprint data and renders form nodes
 * Forms are organized by their prerequisite levels for proper display order
 */
function App() {
  // State to hold the rendered form elements
  const [formElements, setFormElements] = useState<any[]>([]);

  useEffect(() => {
    // Fetch blueprint graph data from the API
    fetch("/api/v1/123/actions/blueprints/bp_456/bpv_123/graph")
      .then((res: Response) => res.json())
      .then((data) => {
        // Extract form components and nodes from the blueprint data
        const formComponents = getComponents(data);
        const nodeForms = getNodes(data, formComponents);
        
        // Sort forms by prerequisite count to ensure proper display order
        nodeForms.sort((a, b) => a.prerequisites.length - b.prerequisites.length);

        let formElements = [];
        // Find the maximum number of prerequisites any form has
        let maxNumPrereqs = Math.max(0, ...nodeForms.map(f => f.prerequisites.length));
        
        // Group forms by prerequisite level and render them
        for (let i = 0; i <= maxNumPrereqs; i++) {
          // Get all forms with exactly i prerequisites
          let curr_forms = nodeForms.filter((f) => f.prerequisites.length === i);
          
          // Render each form with its prerequisite components
          formElements.push(...curr_forms.map((f) => {
            const nodePrerequisites = getNodePrerequisites(nodeForms, f.id);
            const prerequisiteComponents = getPrerequisiteComponents(nodeForms, nodePrerequisites);
            return (
              <Form 
                formNode={f} 
                key={f.id}
                prerequisiteComponents={prerequisiteComponents}
              />
            )
          }));
          
          // Add spacing between prerequisite levels
          formElements.push(<><br /><br /></>)
        }
        setFormElements(formElements);
      });
  }, []);

  return (
    <div className="App">
      {formElements}
    </div>
  );
}

export default App;
