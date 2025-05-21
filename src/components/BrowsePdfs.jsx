/*---+---+---+--Start of BrowsePdfs.jsx Block---+---+---+--*/

/**
 * BrowsePdfs.jsx - PDF Browser Component
 * Displays all available syllabi PDFs stored in Firebase
 * Features:
 * - Fetches PDF list from Firebase Storage
 * - Displays downloadable PDF links
 * - Supports multilingual content
 */

import React, { useState, useEffect } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase";
import { useTranslation } from "react-i18next";
import "./BrowsePdfs.css";
import "./AboutPage.css"; // Shared language toggle styles

const BrowsePdfs = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const { t, i18n } = useTranslation(); //If you get an error here, this is false. i18n is actualy used

  /*---+---+---+--Start of PDF Fetching Block---+---+---+--*/
  /**
   * Fetches PDF files from Firebase Storage
   * Runs once when component mounts
   */
  useEffect(() => {
    const fetchPdfs = async () => {
      const storageRef = ref(storage, "pdfs/");
      try {
        const result = await listAll(storageRef);
        const files = await Promise.all(
          result.items.map(async (fileRef) => {
            const url = await getDownloadURL(fileRef);
            return { name: fileRef.name, url };
          })
        );
        setPdfFiles(files);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
    };

    fetchPdfs();
  }, []);
  /*---+---+---+--End of PDF Fetching Block---+---+---+--*/

  return (
    <div className="pdf-container">
      {/*---+---+---+--Start of PDF List Block---+---+---+--*/}
      <h2 className="title">{t("browsePdfs.title")}</h2>

      <div className="pdf-list">
        {pdfFiles.length > 0 ? (
          pdfFiles.map((pdf, index) => (
            <a
              key={index}
              href={pdf.url}
              target="_blank"
              rel="noopener noreferrer"
              className="pdf-item"
            >
              <div className="pdf-block">
                <img
                  src="/images/Syllabye-White-White.png"
                  alt="PDF Preview"
                  className="pdf-preview"
                />
                <p className="pdf-title">{pdf.name}</p>
              </div>
            </a>
          ))
        ) : (
          <p>{t("browsePdfs.noPdfs")}</p>
        )}
      </div>
      {/*---+---+---+--End of PDF List Block---+---+---+--*/}
    </div>
  );
};

export default BrowsePdfs;

/*---+---+---+--End of BrowsePdfs.jsx Block---+---+---+--*/