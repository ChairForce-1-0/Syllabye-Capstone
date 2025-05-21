/*---+---+---+--Start of SyllabusUploader.jsx Block---+---+---+--*/

/**
 * SyllabusUploader.jsx - PDF Upload and Management Component
 * This component:
 * - Handles PDF generation and upload to Firebase Storage
 * - Manages database records in Firestore and Realtime Database
 * - Cleans up unfinished drafts after successful upload
 * - Provides user feedback during upload process
 */

import React, { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dbRef, set } from "firebase/database";
import { getFirestore, collection, query, where, getDocs, deleteDoc, addDoc, updateDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Button } from "react-bootstrap";
import SyllabusPDF from './SyllabusPDF';
import './SyllabusForm.css';


/*---+---+---+--Start of Main Component Block---+---+---+--*/
/**
 * SyllabusUploader - PDF Upload Management Component
 * @param {Object} formData - Contains all syllabus data from form inputs
 * @returns {JSX.Element} - Upload button and status display
 */
const SyllabusUploader = ({ formData }) => {
    // State for tracking upload status and download URL
    const [uploading, setUploading] = useState(false);
    const [downloadURL, setDownloadURL] = useState(null);

    /*---+---+---+--Start of Upload Handler Block---+---+---+--*/
    /**
     * handleUpload - Main Upload Functionality
     * Handles the complete PDF upload workflow:
     * 1. Generates PDF from form data
     * 2. Uploads to Firebase Storage
     * 3. Creates records in Firestore and Realtime DB
     * 4. Cleans up unfinished drafts
     */
    const handleUpload = async () => {
        setUploading(true);
        try {
            // Generate PDF blob from form data
            const pdfBlob = await pdf(<SyllabusPDF formData={formData} />).toBlob();

            // Initialize Firebase services
            const storage = getStorage();
            const dbFirestore = getFirestore();
            const db = getDatabase();
            const auth = getAuth();
            const user = auth.currentUser;
            const userId = user?.uid || 'anonymous';

            /*---+---+---+--Start of File Naming Block---+---+---+--*/
            // Create standardized filename format: YY-Term-CourseNumber.pdf
            const shortYear = formData.courseYear.slice(-2);
            const termMap = { 'Spring': 'Sp', 'Fall': 'Fa', 'Summer': 'Su' };
            const termAbbrev = termMap[formData.courseTerm] || formData.courseTerm;
            const fileName = `${shortYear}-${termAbbrev}-${formData.courseSectionNumber}.pdf`;
            /*---+---+---+--End of File Naming Block---+---+---+--*/

            // Upload PDF to Firebase Storage
            const fileRef = storageRef(storage, `uploads/${userId}/${fileName}`);
            await uploadBytes(fileRef, pdfBlob);
            const url = await getDownloadURL(fileRef);
            setDownloadURL(url);

            /*---+---+---+--Start of Firestore Operations Block---+---+---+--*/
            // Create new document in Firestore
            const docRef = await addDoc(collection(dbFirestore, "syllabusFields"), {
                ...formData,
                fileName,
                syllabusURL: url,
                updatedAt: Timestamp.now(),
                uploadedAt: Timestamp.now(),
                professorId: userId,
                syllabusID: "" // Temporary empty ID
            });

            // Update document with its own ID
            await updateDoc(docRef, { syllabusID: docRef.id });
            /*---+---+---+--End of Firestore Operations Block---+---+---+--*/

            /*---+---+---+--Start of Realtime DB Block---+---+---+--*/
            // Store reference in Realtime Database for quick access
            await set(dbRef(db, `pdfs/syllabus-${formData.courseSectionNumber}`), { 
                syllabusURL: url 
            });
            /*---+---+---+--End of Realtime DB Block---+---+---+--*/

            /*---+---+---+--Start of Draft Cleanup Block---+---+---+--*/
            // Delete any unfinished drafts matching this course
            const unfinishedRef = collection(dbFirestore, 'users', userId, 'unfinished_syllabi');
            const q = query(
                unfinishedRef,
                where('formData.courseName', '==', formData.courseName),
                where('formData.courseSectionNumber', '==', formData.courseSectionNumber)
            );
            const snapshot = await getDocs(q);
            snapshot.forEach(async (docSnap) => {
                await deleteDoc(docSnap.ref);
                console.log(`Deleted unfinished syllabus: ${docSnap.id}`);
            });
            /*---+---+---+--End of Draft Cleanup Block---+---+---+--*/

            alert("PDF successfully uploaded and unfinished draft removed!");

        } catch (error) {
            console.error("Upload failed:", error);
            alert("Error uploading PDF. Please try again.");
        }
        setUploading(false);
    };
    /*---+---+---+--End of Upload Handler Block---+---+---+--*/


    /*---+---+---+--Start of Render Block---+---+---+--*/
    return (
        <div>
            {/* Upload Button */}
            <Button 
                onClick={handleUpload} 
                disabled={uploading} 
                className="open-modal-button mt-2 mb-2"
            >
                {uploading ? "Uploading..." : "Save Syllabus"}
            </Button>

            {/* Success Message with PDF Link */}
            {downloadURL && (
                <p>
                    Saved! You can view and edit your syllabus on the dashboard page.{' '}
                    <a href={downloadURL} target="_blank" rel="noopener noreferrer">
                        View PDF
                    </a>
                </p>
            )}
        </div>
    );
    /*---+---+---+--End of Render Block---+---+---+--*/
};
/*---+---+---+--End of Main Component Block---+---+---+--*/

export default SyllabusUploader;
/*---+---+---+--End of SyllabusUploader.jsx Block---+---+---+--*/