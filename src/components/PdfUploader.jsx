import React, { useState } from "react";
import { storage } from "../Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./PdfUploader.css";
import { Modal, Button } from "react-bootstrap";

function PdfUploader() {
  const [file, setFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState("");
  const [linkMessage, setLinkMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(""); // PDF preview state

  // Open & Close Modal Handlers
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // File Selection Handler
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setPdfPreviewUrl(URL.createObjectURL(selectedFile)); // Create local preview URL
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  // File Upload Handler
  const handleUpload = async () => {
    if (!file) {
      alert("No file selected!");
      return;
    }

    const storageRef = ref(storage, `pdfs/${file.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setUploadUrl(url);
      console.log("File available at", url);

      setLinkMessage(`Your Syllabus has been uploaded and can be viewed here: `);

      handleClose(); // Close modal after upload
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="pdf-uploader-container">
      <div className="button-container">
      <Button variant='none' onClick={handleShow} className="open-modal-button">
        Upload PDF
      </Button>
      <br />
    </div>


     
      {uploadUrl && (
        <p>
          <br />
          {linkMessage}
          <a href={uploadUrl} target="_blank" rel="noopener noreferrer" className="custom-link">
            Syllabus Link
          </a>
        </p>
      )}

      {/* Upload Modal */}
      <Modal show={showModal} onHide={handleClose} centered size="lg" className="custom-modal">
  {/* Modal Header */}
  <Modal.Header closeButton className="modal-header">
    <Modal.Title className="modal-title">Upload and Preview PDF</Modal.Title>
  </Modal.Header>

  {/* Modal Body */}
  <Modal.Body className="modal-body">
    <p>Please upload your syllabus as a PDF only</p>
    <input type="file" accept="application/pdf" onChange={handleFileChange} />
    <br /><br />

    {/* PDF Preview inside Modal */}
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

  {/* Modal Footer */}
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
