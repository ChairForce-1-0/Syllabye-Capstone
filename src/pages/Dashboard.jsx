/*---+---+---+--Start of Dashboard.jsx Block---+---+---+--*/

/**
 * Dashboard.jsx - User Dashboard Page Component
 * This page:
 * - Displays personalized user greeting
 * - Provides PDF upload functionality
 * - Shows user's uploaded syllabi
 * - Serves as the main user workspace
 */

import UserNameDisplay from "../components/UserNameDisplay";
import MyUploads from "../components/MyUploads";
import PdfUploader from "../components/PdfUploader";

/*---+---+---+--Start of Main Component Block---+---+---+--*/
/**
 * Dashboard - User Workspace Layout
 * @returns {JSX.Element} - Complete dashboard with all user components
 */
const Dashboard = () => {
  return (
    <div> 
      {/* Personalized Greeting */}
      <UserNameDisplay />
      
      {/* PDF Upload Interface */}
      <PdfUploader />
      
      {/* User's Upload History */}
      <MyUploads />
    </div>
  );
};
/*---+---+---+--End of Main Component Block---+---+---+--*/

export default Dashboard;
/*---+---+---+--End of Dashboard.jsx Block---+---+---+--*/