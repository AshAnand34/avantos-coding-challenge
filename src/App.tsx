import React, { useEffect, useState } from 'react';
import { FormNode } from './types';
import { getComponents, getNodes, getPrerequisiteComponents, getNodePrerequisites } from './services/retrieve_blueprint';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './components/Form';

function App() {
  const [formElements, setFormElements] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/v1/123/actions/blueprints/bp_456/bpv_123/graph")
      .then((res: Response) => res.json())
      .then((data) => {
        const formComponents = getComponents(data);
        const nodeForms = getNodes(data, formComponents);
        nodeForms.sort((a, b) => a.prerequisites.length - b.prerequisites.length);

        let formElements = [];
        let maxNumPrereqs = Math.max(0, ...nodeForms.map(f => f.prerequisites.length));
        for (let i = 0; i <= maxNumPrereqs; i++) {
          let curr_forms = nodeForms.filter((f) => f.prerequisites.length === i);
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
