import React, { useState } from "react";
import { storage } from "../Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./PdfUploader.css";
import "./AboutPage.css"; // For language toggle styling
import { Modal, Button } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import { useTranslation } from "react-i18next";

function PdfUploader() {
  const [file, setFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState("");
  const [linkMessage, setLinkMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const { t, i18n } = useTranslation();
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
      alert(t("pdfUploader.alertInvalidFile"));
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert(t("pdfUploader.alertNoFile"));
      return;
    }

    try {
      const personalRef = ref(storage, `uploads/${userId}/${file.name}`);
      const personalSnap = await uploadBytes(personalRef, file);
      const personalUrl = await getDownloadURL(personalSnap.ref);
      setUploadUrl(personalUrl);
      setLinkMessage(t("pdfUploader.uploadSuccess"));

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
      {/* Language Toggle */}


      {/* Link Preview */}
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
              Syllabus Link
            </a>
          </p>
        )}
      </div>

      {/* Upload Button */}
      <div className="button-container">
        <Button
          variant="none"
          onClick={handleShow}
          className="open-modal-button"
        >
          {t("pdfUploader.uploadButton")}
        </Button>
      </div>

      {/* Upload Modal */}
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
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
          <br /><br />

          <div className="text-center mt-3">
            <div
              className="d-inline-flex align-items-center flex-wrap"
              style={{ maxWidth: "100%" }}
            >
              <label
                htmlFor="publicCheck"
                className="form-check-label me-2"
                style={{ whiteSpace: "normal" }}
              >
                {t("pdfUploader.shareLabel")}
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
              <p>{t("pdfUploader.previewLabel")}</p>
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
            {t("pdfUploader.closeButton")}
          </Button>
          <Button
            variant="success"
            onClick={handleUpload}
            className="upload-button"
          >
            {t("pdfUploader.confirmUploadButton")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PdfUploader;
