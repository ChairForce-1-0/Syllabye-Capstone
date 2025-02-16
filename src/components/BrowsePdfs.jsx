import React, { useState, useEffect } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase"; // Import Firebase configuration
import "./BrowsePdfs.css";


const BrowsePdfs = () => {
  const [pdfFiles, setPdfFiles] = useState([]); // Store PDFs

  useEffect(() => {
    const fetchPdfs = async () => {
      const storageRef = ref(storage, "pdfs/"); // Folder where PDFs are stored

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
      <h2 className="title">Browse our public syllabi below</h2>
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
                  src="images/Syllabye-White-White.png"
                  alt="PDF Preview"
                  className="pdf-preview"
                />
                <p className="pdf-title">{pdf.name}</p>
              </div>
            </a>
          ))
        ) : (
          <p>No PDFs found.</p>
        )}
      </div>
    </div>
  );
};

export default BrowsePdfs;
