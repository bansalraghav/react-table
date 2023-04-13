import React from 'react';
import { Container } from 'react-bootstrap';
import CompaniesTable from './components/CompaniesTable';

function App() {
  return (
    <Container>
      <h1>Companies</h1>
      <CompaniesTable />
    </Container>
  );
}

export default App;