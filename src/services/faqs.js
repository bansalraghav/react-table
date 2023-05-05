import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc, where, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";

const faqsRef = collection(db, 'faqs');

export const getFAQs = async () => {
    const snapshot = await getDocs(faqsRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addFAQ = async faq => {
    const docRef = await addDoc(faqsRef, faq);
    return docRef.id;
};

export const updateFAQ = async (id, updates) => {
    await updateDoc(doc(faqsRef, id), updates);
};

export const deleteFAQ = async id => {
    await deleteDoc(doc(faqsRef, id));
};