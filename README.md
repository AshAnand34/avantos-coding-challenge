# Avantos Coding Challenge App

This project is a React-based application for visualizing and configuring form graphs, including prefill mapping between form fields. It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features

- **Form Graph Rendering:**
  - Fetches and displays a set of forms as nodes, ordered by their prerequisites.
  - Each form node is represented as a button; clicking a button opens the Prefill UI for that form.

- **Prefill UI:**
  - Shows all dynamic fields for the selected form.
  - Allows users to view and edit prefill mappings for each field.
  - Mapped fields display their source (e.g., "Form A.email") and can be cleared with an X button.
  - Unmapped fields are shown as available for mapping.

- **Map Data Element Dialog:**
  - When mapping a field, users can select a data element from a categorized list (e.g., Form A, Form B, etc.).
  - Includes a search box for filtering available data elements.
  - Users can cancel or confirm their selection.

## Getting Started

To get a copy of the project up and running on your local machine for development and testing purposes, follow these steps:

### Prerequisites
You need to have Node.js and npm installed on your machine. You can download them from [Node.js official website](https://nodejs.org/).

### Clone the Repository

```bash
git clone https://github.com/AshAnand34/avantos-coding-challenge.git
cd avantos-coding-challenge
```

### Installation

In the project directory, you can run:

`npm install`

This will install the project dependencies. Make sure you have Node.js and npm installed.

### Running the App
In the project directory, you can run:

```npm run dev```

Concurrently starts up a TypeScript server running in port 5000 and runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page/server will reload if you make edits.\
You will also see any lint errors in the console.

### Testing the Application

```npm test```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
