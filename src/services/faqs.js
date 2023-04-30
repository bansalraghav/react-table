import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc, where, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";

const faqRef = collection(db, 'faq');

export const getFAQs = async () => {
    const snapshot = await getDocs(faqRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addFAQ = async f => {
    const docRef = await addDoc(faqRef, f);
    return docRef.id;
};

export const updateFAQ = async (id, updates) => {
    await updateDoc(doc(faqRef, id), updates);
};

export const deleteFAQ = async id => {
    await deleteDoc(doc(faqRef, id));
};