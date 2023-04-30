import React from 'react';
import { Container } from 'react-bootstrap';
import CompaniesTable from './components/CompaniesTable';
import FaqsTable from './components/FaqsTable';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Container>
        <div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
          <h1 style={{ padding: "20px" }}>Companies</h1>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">Companies</Link>
            </li>
            <li>
              <Link to="/faqs">FAQs</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/" element={<CompaniesTable />} />
          <Route path="/faqs" element={<FaqsTable />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}


export default App;