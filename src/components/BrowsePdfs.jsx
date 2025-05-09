import React, { useState, useEffect } from "react"; //This shows up as an error but it is not an error.
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase";
import { useTranslation } from "react-i18next";
import "./BrowsePdfs.css";
import "./AboutPage.css"; // <- bring in styles for language toggle

const BrowsePdfs = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const { t, i18n } = useTranslation(); // This shows up as an error but it is not an error.

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

  return (

    



    <div className="pdf-container">
    

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
    </div>
  );
};

export default BrowsePdfs;
