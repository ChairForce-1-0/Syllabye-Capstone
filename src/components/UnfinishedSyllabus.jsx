/*---+---+---+--Start of UnfinishedSyllabus.jsx Block---+---+---+--*/

/**
 * UnfinishedSyllabus.jsx - Firestore Syllabus Management Utilities
 * This file contains functions for:
 * - Saving incomplete syllabi to user-specific collections
 * - Loading previously saved unfinished syllabi
 * - Handling updates to existing drafts
 */

import { db } from '../Firebase';
import { collection, getDocs, query, where, setDoc, doc, addDoc } from 'firebase/firestore';

/*---+---+---+--Start of Save Function Block---+---+---+--*/
/**
 * saveUnfinishedSyllabus - Saves/Updates Syllabus Draft
 * @param {Object} formData - Current syllabus form data
 * @param {string} userId - Current user's ID
 * Handles both creating new drafts and updating existing ones
 */
export const saveUnfinishedSyllabus = async (formData, userId) => {
    try {
        // Reference to the user's syllabi collection
        const syllabiCollection = collection(db, 'users', userId, 'unfinished_syllabi');
        
        // Check for existing syllabus with same course details
        const q = query(
            syllabiCollection,
            where('formData.courseName', '==', formData.courseName),
            where('formData.courseSectionNumber', '==', formData.courseSectionNumber)
        );
        
        const querySnapshot = await getDocs(q);
        
        // Update existing or create new draft
        if (!querySnapshot.empty) {
            const existingDoc = querySnapshot.docs[0];
            const docRef = existingDoc.ref;
            
            await setDoc(docRef, {
                formData,
                timestamp: new Date(),
            });
            console.log('Syllabus updated.');
        } else {
            await addDoc(syllabiCollection, {
                formData,
                timestamp: new Date(),
            });
            console.log('Syllabus saved.');
        }
    } catch (error) {
        console.log('Error saving or updating syllabus', error);
    }
};
/*---+---+---+--End of Save Function Block---+---+---+--*/


/*---+---+---+--Start of Load Function Block---+---+---+--*/
/**
 * loadUnfinishedSyllabi - Retrieves User's Draft Syllabi
 * @param {string} userId - Current user's ID
 * @returns {Array} - Array of unfinished syllabi with IDs
 */
export const loadUnfinishedSyllabi = async (userId) => {
    try {
        const syllabiCollection = collection(db, 'users', userId, 'unfinished_syllabi');
        const q = query(syllabiCollection, where('timestamp', '>', new Date(0)));
        const querySnapshot = await getDocs(q);
        const syllabi = [];
        querySnapshot.forEach((doc) => {
            syllabi.push({ id: doc.id, ...doc.data() });
        });
        return syllabi;
    } catch (error) {
        console.log('Error loading syllabi', error);
        return [];
    }
};
/*---+---+---+--End of Load Function Block---+---+---+--*/

/*---+---+---+--End of UnfinishedSyllabus.jsx Block---+---+---+--*/