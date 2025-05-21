/*---+---+---+--Start of Create.jsx Block---+---+---+--*/

/**
 * Create.jsx - Syllabus Creation Page Component
 * This page:
 * - Provides instructions for syllabus creation
 * - Hosts the main syllabus form component
 * - Serves as the entry point for new syllabus creation
 */

import SyllabusForm from "../components/SyllabusForm";
import CreateInstructions from "../components/CreateInstructions";

/*---+---+---+--Start of Main Component Block---+---+---+--*/
/**
 * Create - Syllabus Creation Page Layout
 * @returns {JSX.Element} - Page with instructions and form components
 */
const Create = () => {
  return (
    <div> 
      {/* Instructional Content */}
      <CreateInstructions />
      
      {/* Main Syllabus Form */}
      <SyllabusForm /> 
    </div>
  );
};
/*---+---+---+--End of Main Component Block---+---+---+--*/

export default Create;
/*---+---+---+--End of Create.jsx Block---+---+---+--*/