import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getFAQs, addFAQ, updateFAQ, deleteFAQ } from '../services/faqs';

const FaqsTable = () => {
    const [faqs, setFAQs] = useState([]);
    const [newFAQ, setNewFAQ] = useState({ faqId: '', faqDetails: '' });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getFAQs();
            setFAQs(data);
        };

        fetchData();
    }, []);

    const handleInputChange = event => {
        setNewFAQ({ ...newFAQ, [event.target.name]: event.target.value });
    };

    const handleAddFAQ = async () => {
        const id = await addFAQ(newFAQ);
        setFAQs([...faqs, { id, ...newFAQ }]);
        setNewFAQ({ faqId: '', faqDetails: '' });
    };

    const handleUpdateFAQ = async (id, updates) => {
        const newValues = prompt(`Enter new values for ${updates.faqId} (separated by commas):`);
        if (newValues) {
            const [faqId, faqDetails] = newValues.split(',');
            await updateFAQ(id, { faqId, faqDetails });
            const updatedFAQs = faqs.map(faq => {
                if (faq.id === id) {
                    return { ...faq, faqId, faqDetails };
                }

                return faq;
            });

            setFAQs(updatedFAQs);
        }
    };

    const handleDeleteFAQ = async id => {
        await deleteFAQ(id);
        const filteredFAQs = faqs.filter(faq => faq.id !== id);
        setFAQs(filteredFAQs);
    };

    return (
        <>
            <div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                <h1 style={{ padding: "20px" }}>FAQ</h1>
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
                    {faqs.map(faq => (
                        <tr key={faq.id}>
                            <td style={{ padding: '10px' }}>{faq.faqId}</td>
                            <td style={{ padding: '10px' }}>{faq.faqDetails}</td>
                            <td style={{ padding: '10px' }}>
                                <Button variant="outline-primary" style={{ marginRight: '10px', borderRadius: '20px', padding: '5px 10px', fontSize: '14px' }} onClick={() => handleUpdateFAQ(faq.id, { faqId: 'Updated FAQ ID' })}>Update</Button>{' '}
                                <Button variant="outline-danger" style={{ borderRadius: '20px', padding: '5px 10px', fontSize: '14px' }} onClick={() => handleDeleteFAQ(faq.id)}>Delete</Button>
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
                }}>Add New FAQ</h2>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <input type="text" name="faqId" value={newFAQ.faqId} placeholder="FAQ ID" style={{ marginBottom: '10px', padding: '10px', borderRadius: '20px', border: '1px solid black', width: '400px' }} onChange={handleInputChange} />
                    <textarea name="faqDetails" value={newFAQ.faqDetails} placeholder="FAQ Details" style={{ marginBottom: '10px', padding: '10px', borderRadius: '20px', border: '1px solid black', width: '400px', height: '100px' }} onChange={handleInputChange} />
                    <Button variant="primary" style={{ borderRadius: '20px', padding: '5px 10px', fontSize: '14px' }} onClick={handleAddFAQ}>Add FAQ</Button>
                </div>
            </div>
        </>
    );
};

export default FaqsTable;
