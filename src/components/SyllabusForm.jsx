import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Container } from "react-bootstrap";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import InstructorInfo from "./InstructorInfo";
import CourseInfo from "./CourseInfo";
import CourseMaterials from "./CourseMaterials";
import CourseSchedule from "./CourseSchedule";
import CoursePolicy from "./CoursePolicy";
import SyllabusPDF from "./SyllabusPDF";
import SyllabusUploader from "./SyllabusUploader";
import CoursePolicyCont from "./CoursePolicyCont";
import "./SyllabusForm.css"; // Reusing for download and upload buttons
import {
  saveUnfinishedSyllabus,
  loadUnfinishedSyllabi,
} from "./UnfinishedSyllabus";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ReqProfCreate from "./ReqProfCreate";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase";
import "./AboutPage.css";
import { useTranslation } from "react-i18next";

function SyllabusForm() {

  const { t } = useTranslation();

  const initialFormData = { // Variables for creation fields
    instructorName: '',
    officeHours: '',
    officeLocation: '',
    instructorEmail: '',
    instructorPhone: '',
    zoomLink: '',
    courseName: '',
    courseYear: '',
    courseTerm: '',
    courseNumber: '',
    courseSection: '',
    creditHours: '',
    courseDescription: '',
    prerequisuites: '',
    courseTimes: '',
    courseDates: '',
    meetingLocation: '',
    finalDate: '',
    textbooks: '',
    suppleMats: '',
    softwareHardware: '',
    otherMaterials: '',
    scheduleDesc: '',
    scheduleChanges: '',
    gradingPolicy: '',
    coursePolicy: '',
    gradeBreakdown: [
        { assignment: '', points: '', number: '', totalPoints: '', percent: '' },
    ]
};

const initialStepErrors = { 
    1: { instructorName: '', officeHours: '', officeLocation: '', instructorEmail: '' },
    2: { courseName: '', courseSectionNumber: '', courseYear: '', courseTerm: '', 
         creditHours: '', courseDescription: '', prerequisuites: '', courseTimes: '', courseDates: '',
         meetingLocation: '', finalDate: '', learningOutcomes: '', bacCharacteristics: '',
         modalityInstruction: '', uMission: '' },
    3: { textbooks: '', suppleMats: '', softwareHardware: '', otherMaterials: '' },
    4: { scheduleDesc: '', scheduleChanges: '' },
    5: { gradingPolicy: '', coursePolicy: '', assignmentAndGradeChanges: '' },
    6: { gradeBreakdown: '' }, 
};

const [userId, setUserId] = useState(null);

useEffect(() => {
  const auth = getAuth();
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserId(user.uid);
    } else {
      setUserId(null);
    }
  });
  return () => unsubscribe(); 
}, []);

const [showCreateModal, setShowCreateModal] = useState(false);
const [showUnfinishedModal, setShowUnfinishedModal] = useState(false);
const [isEditingUnfinishedSyllabus, setIsEditingUnfinishedSyllabus] = useState(false); // Track if user is continuing unfinished syllabus
const [showPDF, setShowPDF] = useState(false); // Show PDF preview
const [currentStep, setCurrentStep] = useState(1); // Track step in form
const [formData, setFormData] = useState(initialFormData);
const [stepErrors, setStepErrors] = useState(initialStepErrors);
const [savedSyllabi, setSavedSyllabi] = useState([]);

// File naming convention
const shortYear = formData.courseYear.slice(-2); 
const termMap = {
    'Spring': 'Sp',
    'Fall': 'Fa',
    'Summer': 'Su'
};
const termAbbrev = termMap[formData.courseTerm] || formData.courseTerm;
const fileName = `${shortYear}-${termAbbrev}-${formData.courseSection}.pdf`; // filename for downloading syllabus

useEffect(() => {
    const loadData = async () => {
      const syllabi = await loadUnfinishedSyllabi(userId);
      setSavedSyllabi(syllabi);
    };
    if (userId) {
      loadData();
    }
  }, [userId]);

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleClose = () => setShowCreateModal(false);

// save unfinished syllabus
const handleSaveProgress = () => {
    saveUnfinishedSyllabus(formData, userId);
};

// Load the creation modal with filled in data form unfinished syllabi
const handleContinueEditing = (syllabusData) => {
    setFormData(syllabusData.formData);
    setIsEditingUnfinishedSyllabus(true); // For indicating if user is continuing unfinished syllabus
    setShowUnfinishedModal(false);
    setShowCreateModal(true);
};

// Steps for modal when creating syllabus
const nextStep = () => {
    // Check for validation errors before moving to next step
    const currentStepErrors = stepErrors[currentStep];
    const hasErrors = Object.values(currentStepErrors).some(error => error !== '');

    if (!hasErrors) {
        if (currentStep < 6) setCurrentStep(currentStep + 1); 
    }
};

// Go to previous step when creaing syllabus
const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
};

// Shows the pdf preview
const handleGenerateSyllabus = () => {
    setShowPDF(true);
};

const handleStepValidation = (step, errors) => {
    setStepErrors((prevState) => ({
        ...prevState,
        [step]: errors
    }));
};

// Check if there are any errors across all steps to enable/disable the "Generate Syllabus" button
const isFormValid = Object.values(stepErrors).every(errors => 
    Object.values(errors).every(error => error === '')
);

const handleCreateAnotherSyllabus = () => {
    // Reset form data and errors using initial values
    setFormData(initialFormData);
    setStepErrors(initialStepErrors);
    setShowPDF(false); // Hide the PDF preview
    setCurrentStep(1); // Reset to the first step
    setShowCreateModal(true); // Open the modal again
};

const handleCreateNewSyllabus = () => {
    setFormData(initialFormData); // Reset form data for new syllabus
    setIsEditingUnfinishedSyllabus(false); // Reset editing state
    setShowCreateModal(true);
};

const deleteUnfinishedSyllabus = async (syllabusId, userId) => {
    try {
        const syllabusDoc = doc(db, 'users', userId, 'unfinished_syllabi', syllabusId);
        await deleteDoc(syllabusDoc);
        console.log('Unfinished syllabus deleted from database');

        // Optionally update state to reflect deletion
        setSavedSyllabi(prev => prev.filter(s => s.id !== syllabusId));
    } catch (error) {
        console.error('Error deleting unfinished syllabus:', error);
    }
};

// Delete Syllabi in unfinished modal
const handleDelete = async (syllabus) => {
    if (!syllabus.id) {
        console.error('Missing syllabus ID, cannot delete.');
        return;
    }

    await deleteUnfinishedSyllabus(syllabus.id, userId);
};

// Ensure user wants to delete unfinished syllabi
const [confirming, setConfirming] = useState(false);
const handleClick = (syllabus) => {
    if (confirming !== syllabus.id) {
        setConfirming(syllabus.id);
        setTimeout(() => setConfirming(null), 5000); // reset after 5 seconds
    } else {
        handleDelete(syllabus);
    }
};

  return (
    <Container>
      {!showPDF ? (
        <>
          <div className="button-container gap-3 mb-4 mt-4">
            <ReqProfCreate>
              <Button
                variant="primary"
                onClick={handleCreateNewSyllabus}
                className="open-modal-button"
              >
                {t("syllabusForm.createNew")}
              </Button>
              <Button
                variant="primary"
                onClick={() => setShowUnfinishedModal(true)}
                className="open-modal-button"
              >
                {t("syllabusForm.continueUnfinished")}
              </Button>
            </ReqProfCreate>
          </div>

          <Modal
            show={showCreateModal}
            onHide={handleClose}
            centered
            className="custom-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title>
                {isEditingUnfinishedSyllabus
                  ? t("syllabusForm.modalContinue")
                  : t("syllabusForm.modalCreate")}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                {currentStep === 1 && (
                  <InstructorInfo
                    formData={formData}
                    handleChange={handleChange}
                    onValidation={(errors) => handleStepValidation(1, errors)}
                  />
                )}
                {currentStep === 2 && (
                  <CourseInfo
                    formData={formData}
                    handleChange={handleChange}
                    onValidation={(errors) => handleStepValidation(2, errors)}
                  />
                )}
                {currentStep === 3 && (
                  <CourseMaterials
                    formData={formData}
                    handleChange={handleChange}
                    onValidation={(errors) => handleStepValidation(3, errors)}
                  />
                )}
                {currentStep === 4 && (
                  <CourseSchedule
                    formData={formData}
                    handleChange={handleChange}
                    onValidation={(errors) => handleStepValidation(4, errors)}
                  />
                )}
                {currentStep === 5 && (
                  <CoursePolicy
                    formData={formData}
                    handleChange={handleChange}
                    onValidation={(errors) => handleStepValidation(5, errors)}
                  />
                )}
                {currentStep === 6 && (
                  <CoursePolicyCont
                    formData={formData}
                    handleChange={handleChange}
                    onValidation={(errors) => handleStepValidation(6, errors)}
                  />
                )}
              </Form>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
              <Button
                variant="danger"
                onClick={handleClose}
                className="open-modal-button"
              >
                {t("syllabusForm.close")}
              </Button>
              <Button
                variant="warning"
                onClick={handleSaveProgress}
                className="open-modal-button"
              >
                {t("syllabusForm.save")}
              </Button>
              <div>
                <Button
                  variant="secondary"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="open-modal-button me-2"
                >
                  {t("syllabusForm.previous")}
                </Button>
                <Button
                  variant="primary"
                  onClick={nextStep}
                  disabled={currentStep === 6}
                  className="open-modal-button"
                >
                  {t("syllabusForm.next")}
                </Button>
              </div>
              <Button
                variant="primary"
                onClick={handleGenerateSyllabus}
                className={`open-modal-button ms-2 ${
                  currentStep !== 6 || !isFormValid ? "opacity-50" : ""
                }`}
                disabled={currentStep !== 6 || !isFormValid}
              >
                {t("syllabusForm.generate")}
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showUnfinishedModal}
            onHide={() => setShowUnfinishedModal(false)}
            centered
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title style={{ color: "black" }}>
                {t("syllabusForm.unfinishedTitle")}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {savedSyllabi.length === 0 ? (
                <p>{t("syllabusForm.noSaved")}</p>
              ) : (
                savedSyllabi.map((s, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center mb-2"
                  >
                    <div>
                      <strong>
                        {s.formData.courseName || t("syllabusForm.untitled")}
                      </strong>{" "}
                      – Section {s.formData.courseSectionNumber}
                      <br />
                      <small>
                        {t("syllabusForm.savedOn")}{" "}
                        {new Date(s.timestamp?.seconds * 1000).toLocaleString()}
                      </small>
                    </div>
                    <div>
                      <Button
                        className="continue-editing-button mr-2"
                        onClick={() => handleContinueEditing(s)}
                      >
                        {t("syllabusForm.continueEditing")}
                      </Button>
                      <Button
                        className="continue-editing-button mr-2"
                        onClick={() => handleClick(s)}
                      >
                        {confirming === s.id
                          ? t("syllabusForm.confirmDelete")
                          : t("syllabusForm.delete")}
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <>
          <h2 className="text-center mt-4">{t("syllabusForm.previewTitle")}</h2>
          <PDFViewer style={{ width: "100%", height: "500px" }}>
            <SyllabusPDF formData={formData} />
          </PDFViewer>
          <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
            <PDFDownloadLink
              document={<SyllabusPDF formData={formData} />}
              fileName={fileName}
              className="open-modal-button"
            >
              {({ loading }) =>
                loading
                  ? t("syllabusForm.preparingPdf")
                  : t("syllabusForm.download")
              }
            </PDFDownloadLink>
            <SyllabusUploader formData={formData} userId={userId} />
            <Button
              variant="primary"
              onClick={handleCreateAnotherSyllabus}
              className="open-modal-button"
            >
              {t("syllabusForm.createAnother")}
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default SyllabusForm;
