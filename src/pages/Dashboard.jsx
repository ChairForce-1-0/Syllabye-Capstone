import UserNameDisplay from "../components/UserNameDisplay";
import MyUploads from "../components/MyUploads";
import PdfUploader from "../components/PdfUploader";

const Dashboard = () => {
  return (
    
    <div> 
        <UserNameDisplay />
        <PdfUploader />
        <MyUploads />
      
    </div>
  );
};
  
export default Dashboard;