import React from 'react';
import { Container } from 'react-bootstrap';
import CompaniesTable from './components/CompaniesTable';
import NewCompaniesTable from './components/NewCompaniesTable';
import FaqsTable from './components/FaqsTable';
import NewFaqsTable from './components/NewFaqsTable';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Container>
        <nav>
          <ul style={{ height: "50px", background: "lightBlue", fontSize: "20px" }}>
            <li style={{ display: "inline-block", padding: "0 10px", lineHeight: "50px" }}>
              <Link to="/">Companies</Link>
            </li>
            <li style={{ display: "inline-block", padding: "0 10px", lineHeight: "50px" }}>
              <Link to="/faqs">FAQs</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/" element={<NewCompaniesTable />} />
          <Route path="/faqs" element={<NewFaqsTable />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}


export default App;