import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getFAQs, addFAQ, updateFAQ, deleteFAQ } from '../services/faqs';

const NewFaqsTable = () => {
    const [faqs, setFAQs] = useState([]);
    const [newFAQ, setNewFAQ] = useState({ faqId: '', faqDetails: '' });
    const [editingRow, setEditingRow] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getFAQs();
            setFAQs(data);
        };

        fetchData();
    }, []);

    const handleInputChange = (event) => {
        setNewFAQ({ ...newFAQ, [event.target.name]: event.target.value });
    };

    const handleAddFAQ = async () => {
        const id = await addFAQ(newFAQ);
        setFAQs([...faqs, { id, ...newFAQ }]);
        setNewFAQ({ faqId: '', faqDetails: '' });
    };

    const handleUpdateFAQ = async (id, updates) => {
        setEditingRow(id);
    };

    const handleSaveFAQ = async (id) => {
        const updatedFAQ = faqs.find((faq) => faq.id === id);
        const updatedFAQIndex = faqs.findIndex((faq) => faq.id === id);

        const updatedFAQId = document.getElementById(`faqId-${id}`).value;
        const updatedFAQDetails = document.getElementById(`faqDetails-${id}`).value;

        await updateFAQ(id, { faqId: updatedFAQId, faqDetails: updatedFAQDetails });

        const updatedFAQs = [...faqs];
        updatedFAQs[updatedFAQIndex] = { ...updatedFAQ, faqId: updatedFAQId, faqDetails: updatedFAQDetails };

        setFAQs(updatedFAQs);
        setEditingRow(null);
    };

    const handleDeleteFAQ = async (id) => {
        await deleteFAQ(id);
        const filteredFAQs = faqs.filter((faq) => faq.id !== id);
        setFAQs(filteredFAQs);
    };

    return (
        <>
            <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <h1 style={{ padding: '20px' }}>FAQ</h1>
            </div>
            <Table striped bordered hover style={{ margin: 'auto', maxWidth: '800px', border: '2px solid black' }}>
                <thead>
                    <tr style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold' }}>
                        <th style={{ padding: '10px' }}>FAQ ID</th>
                        <th style={{ padding: '10px' }}>FAQ Details</th>
                        <th style={{ padding: '10px' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {faqs.map((faq) => (
                        <tr key={faq.id}>
                            <td style={{ padding: '10px', margin: "10px" }}>
                                {editingRow === faq.id ? (
                                    <input style={{ marginBottom: '10px', padding: '10px', borderRadius: '20px', border: '1px solid black', width: '100%' }} type="text" id={`faqId-${faq.id}`} name="faqId" defaultValue={faq.faqId} />
                                ) : (
                                    faq.faqId
                                )}
                            </td>
                            <td style={{ padding: '10px', margin: "10px" }}>
                                {editingRow === faq.id ? (
                                    <input style={{ marginLeft: "10px", width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '20px', border: '1px solid black' }} type="text" id={`faqDetails-${faq.id}`} name="faqDetails" defaultValue={faq.faqDetails} />
                                ) : (
                                    faq.faqDetails
                                )}
                            </td>
                            <td style={{ padding: '10px', margin: "10px" }}>
                                {editingRow === faq.id ? (
                                    <>
                                        <Button variant="outline-primary" style={{ marginLeft: "20px", marginRight: '10px', borderRadius: '20px', padding: '5px 10px', fontSize: '14px' }} onClick={() => handleSaveFAQ(faq.id)}>Save</Button>
                                        <Button variant="outline-primary" style={{ marginRight: '10px', borderRadius: '20px', padding: '5px 10px', fontSize: '14px' }} onClick={() => setEditingRow(null)}>Cancel</Button>
                                    </>
                                ) : (
                                    <>
                                        <Button variant="outline-primary" style={{ marginLeft: "20px", marginRight: '10px', borderRadius: '20px', padding: '5px 10px', fontSize: '14px' }} onClick={() => handleUpdateFAQ(faq.id)}>Edit</Button>
                                        <Button variant="outline-primary" style={{ marginRight: '10px', borderRadius: '20px', padding: '5px 10px', fontSize: '14px' }} onClick={() => handleDeleteFAQ(faq.id)}>Delete</Button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "50px" }}>
                    <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add New FAQ</h2>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <input type="text" name="faqId" placeholder="FAQ ID" style={{ marginBottom: '10px', padding: '10px', borderRadius: '20px', border: '1px solid black', width: '400px' }} value={newFAQ.faqId} onChange={handleInputChange} />
                        <input type="text" name="faqDetails" placeholder="FAQ Details" style={{ marginBottom: '10px', padding: '10px', borderRadius: '20px', border: '1px solid black', width: '400px' }} value={newFAQ.faqDetails} onChange={handleInputChange} />
                        <Button variant="success" style={{ borderRadius: '20px', padding: "10px" }} onClick={handleAddFAQ}>Add FAQ</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewFaqsTable;