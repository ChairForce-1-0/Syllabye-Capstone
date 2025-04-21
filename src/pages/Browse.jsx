import BrowsePdfs from "../components/BrowsePdfs";
import PdfUploader from "../components/PdfUploader";
import RequireProfessor from "../components/Requireprofessor";

const Browse = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <RequireProfessor>
        <PdfUploader />
      </RequireProfessor>
      <BrowsePdfs />
    </div>
  );
};

export default Browse;
