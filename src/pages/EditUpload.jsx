/*---+---+---+--Start of EditUpload.jsx Block---+---+---+--*/

/**
 * EditUpload.jsx - Syllabus Editing Page Component
 * This component:
 * - Handles PDF preview and management
 * - Supports file deletion and public upload
 * - Manages syllabus metadata editing
 * - Provides modal-based form editing
 */

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getDownloadURL,
  deleteObject,
  ref,
  uploadBytes,
  getBlob,
} from "firebase/storage";
import { storage } from "../Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import EditSyllabusForm from "../components/EditSyllabusForm";
import "../components/EditUpload.css";

/*---+---+---+--Start of Main Component Block---+---+---+--*/
/**
 * EditUpload - Syllabus Management Component
 * @returns {JSX.Element} - Complete edit interface with preview and controls
 */
function EditUpload() {
  const location = useLocation();
  const navigate = useNavigate();
  const { fileName } = location.state || {};

  // State management
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const [syllabusData, setSyllabusData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Firebase authentication
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user?.uid;

  /*---+---+---+--Start of Effects Block---+---+---+--*/
  /**
   * useEffect - PDF Preview Initialization
   * Fetches PDF URL for preview when component mounts
   */
  useEffect(() => {
    const fetchPdfUrl = async () => {
      if (userId && fileName) {
        const pdfRef = ref(storage, `uploads/${userId}/${fileName}`);
        try {
          const url = await getDownloadURL(pdfRef);
          setPdfPreviewUrl(url);
        } catch (error) {
          console.error("Error fetching PDF preview:", error);
        }
      }
    };

    fetchPdfUrl();
  }, [userId, fileName]);
  /*---+---+---+--End of Effects Block---+---+---+--*/

  /*---+---+---+--Start of Handler Functions Block---+---+---+--*/
  /**
   * handleDelete - File Deletion Handler
   * Removes the PDF file from Firebase Storage
   */
  const handleDelete = async () => {
    if (!userId || !fileName) return;

    const fileRef = ref(storage, `uploads/${userId}/${fileName}`);
    try {
      await deleteObject(fileRef);
      alert("File deleted successfully.");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file.");
    }
  };

  /**
   * handlePublicUpload - File Publishing Handler
   * Copies the file from private to public storage
   */
  const handlePublicUpload = async () => {
    const auth = getAuth();
    const waitForAuth = () =>
      new Promise((resolve) =>
        onAuthStateChanged(auth, (user) => resolve(user))
      );

    const user = await waitForAuth();
    const userId = user?.uid;

    if (!userId || !fileName) {
      alert("User not authenticated or file missing.");
      return;
    }

    const privateFileRef = ref(storage, `uploads/${userId}/${fileName}`);
    const publicFileRef = ref(storage, `pdfs/${fileName}`);

    try {
      const blob = await getBlob(privateFileRef);
      await uploadBytes(publicFileRef, blob);
      alert("File uploaded publicly!");
    } catch (error) {
      console.error("Error uploading file publicly:", error);
      alert("Upload failed: " + error.message);
    }
  };

  /**
   * handleEdit - Metadata Editing Handler
   * Fetches syllabus data and opens edit modal
   */
  const handleEdit = async () => {
    if (!userId || !fileName) {
      alert("User not authenticated or file name missing.");
      return;
    }

    try {
      const q = query(
        collection(db, "syllabusFields"),
        where("fileName", "==", fileName)
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docData = snapshot.docs[0].data();
        setSyllabusData(docData);
        setShowModal(true);
      } else {
        alert("No syllabus metadata found in Firestore.");
      }
    } catch (error) {
      console.error("Error fetching syllabus metadata:", error);
      alert("Failed to load syllabus details.");
    }
  };
  /*---+---+---+--End of Handler Functions Block---+---+---+--*/

  /*---+---+---+--Start of Render Block---+---+---+--*/
  return (
    <div className="edit-container">
      <h1 className="edit-title">Edit Upload</h1>
      {fileName ? (
        <>
          <p className="edit-filename">
            You are editing: <strong>{fileName}</strong>
          </p>
          {pdfPreviewUrl ? (
            <div className="preview-card">
              {/* PDF Preview */}
              <iframe
                src={pdfPreviewUrl}
                className="preview-frame"
                title="PDF Preview"
              ></iframe>
              
              {/* Action Buttons */}
              <div className="button-group">
                <button onClick={handleDelete} className="btn btn-delete">
                  Delete File
                </button>
                <button onClick={handlePublicUpload} className="btn btn-public">
                  Upload Publicly
                </button>
                <button onClick={handleEdit} className="btn btn-edit">
                  Edit
                </button>
              </div>
            </div>
          ) : (
            <p>Loading preview...</p>
          )}
        </>
      ) : (
        <p>No file name provided.</p>
      )}
      
      {/* Edit Modal */}
      {showModal && syllabusData && (
        <EditSyllabusForm
          showModal={showModal}
          handleClose={() => setShowModal(false)}
          initialData={syllabusData}
        />
      )}
    </div>
  );
  /*---+---+---+--End of Render Block---+---+---+--*/
}
/*---+---+---+--End of Main Component Block---+---+---+--*/

export default EditUpload;
/*---+---+---+--End of EditUpload.jsx Block---+---+---+--*/