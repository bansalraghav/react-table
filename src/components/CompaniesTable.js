import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getCompanies, addCompany, updateCompany, deleteCompany } from '../services/companies';

const CompaniesTable = () => {
    const [companies, setCompanies] = useState([]);
    const [newCompany, setNewCompany] = useState({ companyName: '', companyTitle: '', logo: '', backgroundImage: '', countryName: '', countryCode: '' });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCompanies();
            setCompanies(data);
        };

        fetchData();
    }, []);

    const handleInputChange = event => {
        setNewCompany({ ...newCompany, [event.target.name]: event.target.value });
    };

    const handleAddCompany = async () => {
        const id = await addCompany(newCompany);
        setCompanies([...companies, { id, ...newCompany }]);
        setNewCompany({ companyName: '', companyTitle: '', logo: '', backgroundImage: '', countryName: '', countryCode: '' });
    };

    const handleUpdateCompany = async (id, updates) => {
        const newValues = prompt(`Enter new values for ${updates.companyName} (separated by commas):`);
        if (newValues) {
            const [companyName, companyTitle, logo, backgroundImage, countryName, countryCode] = newValues.split(',');
            await updateCompany(id, { companyName, companyTitle, logo, backgroundImage, countryName, countryCode });
            const updatedCompanies = companies.map(company => {
                if (company.id === id) {
                    return { ...company, companyName, companyTitle, logo, backgroundImage, countryName, countryCode };
                }

                return company;
            });

            setCompanies(updatedCompanies);
        }
    };

    const handleDeleteCompany = async id => {
        await deleteCompany(id);
        const filteredCompanies = companies.filter(company => company.id !== id);
        setCompanies(filteredCompanies);
    };

    return (
        <>
            <div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                <h1 style={{ padding: "20px" }}>Companies</h1>
            </div>
            <Table striped bordered hover style={{ margin: 'auto', maxWidth: '800px', border: '2px solid black' }}>
                <thead>
                    <tr style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold' }}>
                        <th style={{ padding: '10px' }}>Company Name</th>
                        <th style={{ padding: '10px' }}>Company Title</th>
                        <th style={{ padding: '10px' }}>Logo</th>
                        <th style={{ padding: '10px' }}>Background Image</th>
                        <th style={{ padding: '10px' }}>Country Name</th>
                        <th style={{ padding: '10px' }}>Country Code</th>
                        <th style={{ padding: '10px' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map(company => (
                        <tr key={company.id}>
                            <td style={{ padding: '10px' }}>{company.companyName}</td>
                            <td style={{ padding: '10px' }}>{company.companyTitle}</td>
                            <td style={{ padding: '10px' }}><img src={company.logo} alt={company.companyName} style={{ width: '50px', height: '50px', borderRadius: '50%', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)' }} /></td>
                            <td style={{ padding: '10px' }}><img src={company.backgroundImage} alt={company.companyName} style={{ width: '50px', height: '50px', borderRadius: '10px', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)' }} /></td>
                            <td style={{ padding: '10px' }}>{company.countryName}</td>
                            <td style={{ padding: '10px' }}>{company.countryCode}</td>
                            <td style={{ padding: '10px' }}>
                                <Button variant="outline-primary" style={{ marginRight: '10px', borderRadius: '20px', padding: '5px 10px', fontSize: '14px' }} onClick={() => handleUpdateCompany(company.id, { companyName: 'Updated Company Name' })}>Update</Button>{' '}
                                <Button variant="outline-danger" style={{ borderRadius: '20px', padding: '5px 10px', fontSize: '14px' }} onClick={() => handleDeleteCompany(company.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px'
            }}>
                <h2 style={{
                    marginBottom: '20px',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#e50914'
                }}>Add Company</h2>

                <input type="text"
                    name="companyName"
                    placeholder="Company Name"
                    value={newCompany.companyName}
                    onChange={handleInputChange}
                    style={{
                        padding: '10px',
                        marginBottom: '10px',
                        fontSize: '1.2rem',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        width: '30%'
                    }}
                />

                <input type="text"
                    name="companyTitle"
                    placeholder="Company Title"
                    value={newCompany.companyTitle}
                    onChange={handleInputChange}
                    style={{
                        padding: '10px',
                        marginBottom: '10px',
                        fontSize: '1.2rem',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        width: '30%'
                    }}
                />

                <div style={{
                    marginBottom: '10px',
                    fontSize: '1.2rem',
                    color: '#666'
                }}>
                    <label htmlFor="logo" style={{ marginRight: '10px' }}>Logo:</label>
                    <input type="file" id="logo" name="logo" accept="image/*" onChange={handleInputChange} />
                </div>

                <div style={{
                    marginBottom: '10px',
                    fontSize: '1.2rem',
                    color: '#666'
                }}>
                    <label htmlFor="background-image" style={{ marginRight: '10px' }}>Background Image:</label>
                    <input type="file" id="background-image" name="backgroundImage" accept="image/*" onChange={handleInputChange} />
                </div>

                <input type="text"
                    name="countryName"
                    placeholder="Country Name"
                    value={newCompany.countryName}
                    onChange={handleInputChange}
                    style={{
                        padding: '10px',
                        marginBottom: '10px',
                        fontSize: '1.2rem',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        width: '30%'
                    }}
                />

                <input type="text"
                    name="countryCode"
                    placeholder="Country Code"
                    value={newCompany.countryCode}
                    onChange={handleInputChange}
                    style={{
                        padding: '10px',
                        marginBottom: '10px',
                        fontSize: '1.2rem',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        width: '30%'
                    }}
                />

                <Button variant="success" onClick={handleAddCompany} style={{
                    padding: '10px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    borderRadius: '5px',
                    border: 'none',
                    backgroundColor: '#e50914',
                    color: '#fff',
                    width: '20%'
                }}>
                    Add Company
                </Button>
            </div>


        </>
    );
};

export default CompaniesTable;