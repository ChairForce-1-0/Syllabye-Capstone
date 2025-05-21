/*---+---+---+--Start of CreateInstructions.jsx Block---+---+---+--*/

/**
 * CreateInstructions.jsx - The Syllabus Creation Guide Component
 * This component provides:
 * - Step-by-step instructions for syllabus creation
 * - Multi-language support through react-i18next
 * - Responsive card layout with clear visual hierarchy
 */

/*---+---+---+--Start of Imports Block---+---+---+--*/
import { Card, Container } from "react-bootstrap";      // Bootstrap UI components
import { useTranslation, Trans } from "react-i18next";  // Internationalization hooks
import "./CreateInstructions.css";                      // Component-specific styles
/*---+---+---+--End of Imports Block---+---+---+--*/


/*---+---+---+--Start of Component Block---+---+---+--*/
const CreateInstructions = () => {
  /*---+---+---+--Start of Translation Block---+---+---+--*/
  const { t } = useTranslation();  // Hook for language translation
  /*---+---+---+--End of Translation Block---+---+---+--*/


  /*---+---+---+--Start of Render Block---+---+---+--*/
  return (
    <Container className="create-instructions-container">
      {/*---+---+---+--Start of Instruction Card Block---+---+---+--*/}
      <Card className="instruction-card p-4 shadow-sm">
        <Card.Body>
          {/* Card Title with Centered Heading */}
          <Card.Title className="instruction-title text-center mb-4">
            <h2 className="instruction-heading">
              {t("createInstructions.title")}  {/* Translated title */}
            </h2>
          </Card.Title>

          {/*---+---+---+--Start of Instruction List Block---+---+---+--*/}
          <ol className="instruction-list">
            {/* Instruction Step 1 */}
            <li>
              <Trans i18nKey="createInstructions.step1">
                Click <strong>Create Syllabus</strong> to create your syllabus.
              </Trans>
            </li>

            {/* Instruction Step 2 */}
            <li>
              {t("createInstructions.step2")}  {/* Simple translated text */}
            </li>

            {/* Instruction Step 3 */}
            <li>
              <Trans i18nKey="createInstructions.step3">
                Click <strong>Next</strong> to move through the steps of creating your syllabus.
              </Trans>
            </li>

            {/* Instruction Step 4 */}
            <li>
              <Trans i18nKey="createInstructions.step4">
                Use <strong>Generate Syllabus</strong> to preview it.
              </Trans>
            </li>

            {/* Instruction Step 5 */}
            <li>
              <Trans i18nKey="createInstructions.step5">
                Then <strong>Upload</strong> to the site (publicly available) for students to use or <strong>Download</strong> to PDF.
              </Trans>
            </li>
          </ol>
          {/*---+---+---+--End of Instruction List Block---+---+---+--*/}
        </Card.Body>
      </Card>
      {/*---+---+---+--End of Instruction Card Block---+---+---+--*/}
    </Container>
  );
  /*---+---+---+--End of Render Block---+---+---+--*/
};
/*---+---+---+--End of Component Block---+---+---+--*/

export default CreateInstructions;  // Makes component available to parent components

/*---+---+---+--End of CreateInstructions.jsx Block---+---+---+--*/