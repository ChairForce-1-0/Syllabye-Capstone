import { Card, Container } from "react-bootstrap";
import { useTranslation, Trans } from "react-i18next";
import "./CreateInstructions.css";

const CreateInstructions = () => {
  const { t } = useTranslation();

  return (
    <Container className="create-instructions-container">
      <Card className="instruction-card p-4 shadow-sm">
        <Card.Body>
          <Card.Title className="instruction-title text-center mb-4">
            <h2 className="instruction-heading">{t("createInstructions.title")}</h2>
          </Card.Title>
          <ol className="instruction-list">
            <li>
              <Trans i18nKey="createInstructions.step1">
                Click <strong>Create Syllabus</strong> to create your syllabus.
              </Trans>
            </li>
            <li>{t("createInstructions.step2")}</li>
            <li>
              <Trans i18nKey="createInstructions.step3">
                Click <strong>Next</strong> to move through the steps of creating your syllabus.
              </Trans>
            </li>
            <li>
              <Trans i18nKey="createInstructions.step4">
                Use <strong>Generate Syllabus</strong> to preview it.
              </Trans>
            </li>
            <li>
              <Trans i18nKey="createInstructions.step5">
                Then <strong>Upload</strong> to the site (publicly available) for students to use or <strong>Download</strong> to PDF.
              </Trans>
            </li>
          </ol>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateInstructions;
