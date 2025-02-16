import BrowsePdfs from "../components/BrowsePdfs";
import PdfUploader from "../components/PdfUploader";

const Browse = () => {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>View PDF</h1>
        <PdfUploader />
        
        <BrowsePdfs />
  
      </div>
    );
  };
  
  export default Browse;
  