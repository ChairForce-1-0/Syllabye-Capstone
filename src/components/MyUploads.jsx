/*---+---+---+--Start of MyUploads.jsx Block---+---+---+--*/

/**
 * MyUploads.jsx - The User Uploads Display Component
 * This component provides:
 * - List of user-uploaded syllabi PDFs
 * - Firebase storage integration
 * - PDF preview and navigation
 * - Multi-language support
 */

/*---+---+---+--Start of Imports Block---+---+---+--*/
import React, { useState, useEffect } from "react";         // Core React functionality
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";  // Firebase storage
import { storage } from "../Firebase";                      // Firebase configuration
import { getAuth } from "firebase/auth";                   // Firebase authentication
import { useNavigate } from "react-router-dom";            // Client-side navigation
import { useTranslation } from "react-i18next";            // Internationalization
import "./BrowsePdfs.css";                                 // Component styles
/*---+---+---+--End of Imports Block---+---+---+--*/


/*---+---+---+--Start of Component Block---+---+---+--*/
function MyUploads() {
    /*---+---+---+--Start of State Management Block---+---+---+--*/
    const [userUploads, setuserUploads] = useState([]);    // Stores user's uploaded files
    const auth = getAuth();                                // Firebase auth instance
    const user = auth.currentUser;                         // Current authenticated user
    const userId = user?.uid;                              // Current user's ID
    const navigate = useNavigate();                        // Navigation hook
    const { t } = useTranslation();                        // Translation hook
    /*---+---+---+--End of State Management Block---+---+---+--*/


    /*---+---+---+--Start of Data Fetching Block---+---+---+--*/
    useEffect(() => {
        const fetchPdfs = async () => {
            const storageRef = ref(storage, `uploads/${userId}/`);  // User-specific storage path

            try {
                const result = await listAll(storageRef);
                const files = await Promise.all(
                    result.items.map(async (fileRef) => {
                        const url = await getDownloadURL(fileRef);
                        return { name: fileRef.name, url };
                    })
                );

                setuserUploads(files);
            } catch (error) {
                console.error("Error fetching Uploads:", error);
            }
        };

        fetchPdfs();
    }, [userId]);
    /*---+---+---+--End of Data Fetching Block---+---+---+--*/


    /*---+---+---+--Start of Render Block---+---+---+--*/
    return (
        <div className="pdf-container">
            <h2 className="title">{t("myUploads.title")}</h2>
            <br /><br />
            <div className="pdf-list">
                {userUploads.length > 0 ? (
                    userUploads.map((pdf, index) => (
                        <div
                            key={index}
                            className="pdf-item"
                            onClick={() =>
                                navigate("/EditUpload", { state: { fileName: pdf.name } })
                            }
                            style={{ cursor: "pointer" }}
                        >
                            <div className="pdf-block">
                                <img
                                    src="/images/Syllabye-White-White.png"
                                    alt="PDF Preview"
                                    className="pdf-preview"
                                />
                                <p className="pdf-title">{pdf.name}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>{t("myUploads.noFiles")}</p>
                )}
            </div>
        </div>
    );
    /*---+---+---+--End of Render Block---+---+---+--*/
}
/*---+---+---+--End of Component Block---+---+---+--*/

export default MyUploads;  // Makes component available to routing

/*---+---+---+--End of MyUploads.jsx Block---+---+---+--*/