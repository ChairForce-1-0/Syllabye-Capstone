/*---+---+---+--Start of PdfUploader.jsx Block---+---+---+--*/

/**
 * PdfUploader.jsx - The PDF Upload and Management Component
 * This component provides:
 * - Secure PDF upload to Firebase Storage
 * - Private and public storage options
 * - PDF preview functionality
 * - Multi-language support
 * - Modal-based interface
 * - Download link generation
 */

/*---+---+---+--Start of Imports Block---+---+---+--*/
import React, { useState } from "react";                   // Core React functionality
import { storage } from "../Firebase";                     // Firebase storage instance
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";  // Storage operations
import "./PdfUploader.css";                                // Component-specific styles
import "./AboutPage.css";                                  // Shared language toggle styles
import { Modal, Button } from "react-bootstrap";           // UI components
import { getAuth } from "firebase/auth";                   // Authentication
import { useTranslation } from "react-i18next";            // Internationalization
/*---+---+---+--End of Imports Block---+---+---+--*/


/*---+---+---+--Start of Component Block---+---+---+--*/
function PdfUploader() {
    /*---+---+---+--Start of State Management Block---+---+---+--*/
    const [file, setFile] = useState(null);                // Selected PDF file
    const [uploadUrl, setUploadUrl] = useState("");        // Generated download URL
    const [linkMessage, setLinkMessage] = useState("");    // Upload status message
    const [showModal, setShowModal] = useState(false);     // Modal visibility
    const [pdfPreviewUrl, setPdfPreviewUrl] = useState(""); // PDF preview URL
    const [isPublic, setIsPublic] = useState(false);       // Public/private toggle
    /*---+---+---+--End of State Management Block---+---+---+--*/


    /*---+---+---+--Start of Authentication Block---+---+---+--*/
    const { t, i18n } = useTranslation();                  // Translation hook
    const auth = getAuth();                                // Firebase auth instance
    const user = auth.currentUser;                         // Current user
    const userId = user?.uid;                              // User ID
    /*---+---+---+--End of Authentication Block---+---+---+--*/


    /*---+---+---+--Start of Modal Control Block---+---+---+--*/
    const handleShow = () => setShowModal(true);           // Show modal
    const handleClose = () => setShowModal(false);         // Hide modal
    /*---+---+---+--End of Modal Control Block---+---+---+--*/


    /*---+---+---+--Start of File Handling Block---+---+---+--*/
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
            setPdfPreviewUrl(URL.createObjectURL(selectedFile));  // Create preview
        } else {
            alert(t("pdfUploader.alertInvalidFile"));  // Invalid file type
        }
    };
    /*---+---+---+--End of File Handling Block---+---+---+--*/


    /*---+---+---+--Start of Upload Logic Block---+---+---+--*/
    const handleUpload = async () => {
        if (!file) {
            alert(t("pdfUploader.alertNoFile"));
            return;
        }

        try {
            // Upload to private user storage
            const personalRef = ref(storage, `uploads/${userId}/${file.name}`);
            const personalSnap = await uploadBytes(personalRef, file);
            const personalUrl = await getDownloadURL(personalSnap.ref);
            setUploadUrl(personalUrl);
            setLinkMessage(t("pdfUploader.uploadSuccess"));

            // Optional upload to public storage
            if (isPublic) {
                const publicRef = ref(storage, `pdfs/${file.name}`);
                await uploadBytes(publicRef, file);
            }

            handleClose();  // Close modal after upload
        } catch (error) {
            console.error("Upload error:", error);
        }
    };
    /*---+---+---+--End of Upload Logic Block---+---+---+--*/


    /*---+---+---+--Start of Render Block---+---+---+--*/
    return (
        <div className="pdf-uploader-container">
            {/*---+---+---+--Start of Link Preview Block---+---+---+--*/}
            <div className="link-container">
                {uploadUrl && (
                    <p>
                        {linkMessage}
                        <a
                            href={uploadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="custom-link"
                        >
                            {t("pdfUploader.syllabusLink")}
                        </a>
                    </p>
                )}
            </div>
            {/*---+---+---+--End of Link Preview Block---+---+---+--*/}

            {/*---+---+---+--Start of Upload Button Block---+---+---+--*/}
            <div className="button-container">
                <Button
                    variant="none"
                    onClick={handleShow}
                    className="open-modal-button"
                >
                    {t("pdfUploader.uploadButton")}
                </Button>
            </div>
            {/*---+---+---+--End of Upload Button Block---+---+---+--*/}

            {/*---+---+---+--Start of Upload Modal Block---+---+---+--*/}
            <Modal
                show={showModal}
                onHide={handleClose}
                centered
                size="lg"
                className="custom-modal"
            >
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title className="modal-title">
                        {t("pdfUploader.modalTitle")}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className="modal-body">
                    <p>{t("pdfUploader.instruction")}</p>
                    <input 
                        type="file" 
                        accept="application/pdf" 
                        onChange={handleFileChange} 
                        aria-label={t("pdfUploader.fileInputLabel")}
                    />
                    <br /><br />

                    {/*---+---+---+--Start of Public Toggle Block---+---+---+--*/}
                    <div className="text-center mt-3">
                        <div className="d-inline-flex align-items-center flex-wrap">
                            <label
                                htmlFor="publicCheck"
                                className="form-check-label me-2"
                            >
                                {t("pdfUploader.shareLabel")}
                            </label>
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="publicCheck"
                                checked={isPublic}
                                onChange={(e) => setIsPublic(e.target.checked)}
                            />
                        </div>
                    </div>
                    {/*---+---+---+--End of Public Toggle Block---+---+---+--*/}

                    <br /><br />

                    {/*---+---+---+--Start of PDF Preview Block---+---+---+--*/}
                    {pdfPreviewUrl && (
                        <div>
                            <p>{t("pdfUploader.previewLabel")}</p>
                            <iframe
                                src={pdfPreviewUrl}
                                width="100%"
                                height="400px"
                                style={{ border: "1px solid #ddd", borderRadius: "8px" }}
                                title={t("pdfUploader.previewTitle")}
                                aria-label={t("pdfUploader.previewAriaLabel")}
                            ></iframe>
                        </div>
                    )}
                    {/*---+---+---+--End of PDF Preview Block---+---+---+--*/}
                </Modal.Body>

                <Modal.Footer className="modal-footer">
                    <Button variant="secondary" onClick={handleClose}>
                        {t("pdfUploader.closeButton")}
                    </Button>
                    <Button
                        variant="success"
                        onClick={handleUpload}
                        className="upload-button"
                        disabled={!file}
                    >
                        {t("pdfUploader.confirmUploadButton")}
                    </Button>
                </Modal.Footer>
            </Modal>
            {/*---+---+---+--End of Upload Modal Block---+---+---+--*/}
        </div>
    );
    /*---+---+---+--End of Render Block---+---+---+--*/
}
/*---+---+---+--End of Component Block---+---+---+--*/

export default PdfUploader;  // Makes component available to parent components

/*---+---+---+--End of PdfUploader.jsx Block---+---+---+--*/