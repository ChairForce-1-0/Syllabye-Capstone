/*---+---+---+--Start of Browse.jsx Block---+---+---+--*/

/**
 * Browse.jsx - Syllabus Browser Page Component
 * This page:
 * - Handles PDF browsing and uploading
 * - Restricts upload functionality to professors
 * - Provides centralized viewing of all syllabi
 */

import BrowsePdfs from "../components/BrowsePdfs";
import PdfUploader from "../components/PdfUploader";
import RequireProfessor from "../components/Requireprofessor";

/*---+---+---+--Start of Main Component Block---+---+---+--*/
/**
 * Browse - Syllabus Management Page
 * @returns {JSX.Element}
 */
const Browse = () => {
  return (
    <div style={{ textAlign: "center" }}>
      {/* Professor-only Upload Section */}
      <RequireProfessor>
        <PdfUploader />
      </RequireProfessor>
      {/* Public Browse Section */}
      <BrowsePdfs />
    </div>
  );
};
/*---+---+---+--End of Main Component Block---+---+---+--*/

export default Browse;
/*---+---+---+--End of Browse.jsx Block---+---+---+--*/