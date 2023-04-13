// import { db } from "../firebase/firebase";

// const companiesRef = db.collection('companies');

// export const getCompanies = async () => {
//     const snapshot = await companiesRef.get();

//     return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// };

// export const addCompany = async company => {
//     const docRef = await companiesRef.add(company);

//     return docRef.id;
// };

// export const updateCompany = async (id, updates) => {
//     await companiesRef.doc(id).update(updates);
// };

// export const deleteCompany = async id => {
//     await companiesRef.doc(id).delete();
// };


import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc, where, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";

const companiesRef = collection(db, 'companies');

export const getCompanies = async () => {
    const snapshot = await getDocs(companiesRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addCompany = async company => {
    const docRef = await addDoc(companiesRef, company);
    return docRef.id;
};

export const updateCompany = async (id, updates) => {
    await updateDoc(doc(companiesRef, id), updates);
};

export const deleteCompany = async id => {
    await deleteDoc(doc(companiesRef, id));
};


