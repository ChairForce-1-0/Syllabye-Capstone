import React, { useState } from "react";
import { storage } from "../Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./PdfUploader.css";
import { Modal, Button } from "react-bootstrap";
import { getAuth } from "firebase/auth";

function PdfUploader() {
  const [file, setFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState("");
  const [linkMessage, setLinkMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user?.uid;


  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setPdfPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("No file selected!");
      return;
    }
  
    try {
      // Uploads to user specific folder based on userID
      const personalRef = ref(storage, `uploads/${userId}/${file.name}`);
      const personalSnap = await uploadBytes(personalRef, file);
      const personalUrl = await getDownloadURL(personalSnap.ref);
      setUploadUrl(personalUrl);
      setLinkMessage(`Your Syllabus has been uploaded and can be viewed here: `);
  
      // if public checkbox is marked it is also added to the pdfs folder in storage so it will display on the browse page
      if (isPublic) {
        const publicRef = ref(storage, `pdfs/${file.name}`);
        await uploadBytes(publicRef, file); 
      }
  
      handleClose();
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="pdf-uploader-container">
      {/* Link in Center */}
      <div className="link-container">
        {uploadUrl && (
          <p>
            {linkMessage}
            <a href={uploadUrl} target="_blank" rel="noopener noreferrer" className="custom-link">
              Syllabus Link
            </a>
          </p>
        )}
      </div>

      {/* Button on the Right */}
      <div className="button-container">
        <Button variant="none" onClick={handleShow} className="open-modal-button">
          Upload PDF
        </Button>
      </div>

      {/* Upload Modal */}
      <Modal show={showModal} onHide={handleClose} centered size="lg" className="custom-modal">
        <Modal.Header closeButton className="modal-header">
          <Modal.Title className="modal-title">Upload and Preview PDF</Modal.Title>
        </Modal.Header>
        

        <Modal.Body className="modal-body">
          <p>Please upload your syllabus as a PDF only</p>
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
          <br /><br />
          <div className="text-center mt-3">
           <div className="d-inline-flex align-items-center flex-wrap" style={{ maxWidth: "100%" }}>
             <label htmlFor="publicCheck" className="form-check-label me-2" style={{ whiteSpace: "normal" }}>
               Share this Syllabus Publicly on our Browse page: 
             </label>
             <input
               type="checkbox"
               className="form-check-input"
               id="publicCheck"
               checked={isPublic}
               onChange={(e) => setIsPublic(e.target.checked)}
               style={{ transform: "scale(1.2)" }}
             />
           </div>
          </div>

            <br /><br />


          
          {pdfPreviewUrl && (
            <div>
              <p>Preview:</p>
              <iframe 
                src={pdfPreviewUrl} 
                width="100%" 
                height="400px" 
                style={{ border: "1px solid #ddd", borderRadius: "8px" }} 
                title="PDF Preview"
              ></iframe>
              
            </div>
            
          )}
        </Modal.Body>

        <Modal.Footer className="modal-footer">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleUpload} className="upload-button">
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PdfUploader;
