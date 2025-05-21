/*---+---+---+--Start of SyllabusForm.jsx Block---+---+---+--*/

/**
 * SyllabusForm.jsx - The Comprehensive Syllabus Creation Component
 * This component provides:
 * - Multi-step syllabus creation form with validation
 * - PDF generation and preview functionality
 * - Save/resume progress capability
 * - Professor role verification
 * - Multi-language support
 * - Cloud storage integration
 */

/*---+---+---+--Start of Imports Block---+---+---+--*/
import React, { useState, useEffect } from "react";               // Core React functionality
import { Button, Modal, Form, Container, ProgressBar, Alert } from "react-bootstrap";  // UI components
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";  // PDF handling
import InstructorInfo from "./InstructorInfo";                    // Form sections
import CourseInfo from "./CourseInfo";
import CourseMaterials from "./CourseMaterials";
import CourseSchedule from "./CourseSchedule";
import CoursePolicy from "./CoursePolicy";
import SyllabusPDF from "./SyllabusPDF";                          // PDF generator
import SyllabusUploader from "./SyllabusUploader";                // Cloud upload
import CoursePolicyCont from "./CoursePolicyCont";                // Additional policy section
import "./SyllabusForm.css";                                      // Component styles
import { saveUnfinishedSyllabus, loadUnfinishedSyllabi } from "./UnfinishedSyllabus";  // Local storage
import { getAuth, onAuthStateChanged } from "firebase/auth";     // Authentication
import ReqProfCreate from "./ReqProfCreate";                      // Role verification
import { doc, deleteDoc } from "firebase/firestore";              // Database operations
import { db } from "../Firebase";                                 // Firebase config
import "./AboutPage.css";                                         // Shared styles
import { useTranslation } from "react-i18next";                   // Internationalization
/*---+---+---+--End of Imports Block---+---+---+--*/


/*---+---+---+--Start of Initial Data Block---+---+---+--*/
const initialFormData = {
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
    2: { 
        courseName: '', courseSectionNumber: '', courseYear: '', courseTerm: '',
        creditHours: '', courseDescription: '', prerequisuites: '', courseTimes: '', 
        courseDates: '', meetingLocation: '', finalDate: '', learningOutcomes: '',
        bacCharacteristics: '', modalityInstruction: '', uMission: '' 
    },
    3: { textbooks: '', suppleMats: '', softwareHardware: '', otherMaterials: '' },
    4: { scheduleDesc: '', scheduleChanges: '' },
    5: { gradingPolicy: '', coursePolicy: '', assignmentAndGradeChanges: '' },
    6: { gradeBreakdown: '' }, 
};
/*---+---+---+--End of Initial Data Block---+---+---+--*/


/*---+---+---+--Start of Component Block---+---+---+--*/
function SyllabusForm() {
    /*---+---+---+--Start of Translation Block---+---+---+--*/
    const { t } = useTranslation();  // Translation hook
    /*---+---+---+--End of Translation Block---+---+---+--*/

    /*---+---+---+--Start of State Management Block---+---+---+--*/
    const [userId, setUserId] = useState(null);                  // Current user ID
    const [showCreateModal, setShowCreateModal] = useState(false); // Creation modal visibility
    const [showUnfinishedModal, setShowUnfinishedModal] = useState(false); // Unfinished syllabi modal
    const [isEditingUnfinishedSyllabus, setIsEditingUnfinishedSyllabus] = useState(false);
    const [showPDF, setShowPDF] = useState(false);               // PDF preview visibility
    const [currentStep, setCurrentStep] = useState(1);           // Current form step (1-6)
    const [formData, setFormData] = useState(initialFormData);   // Form data state
    const [stepErrors, setStepErrors] = useState(initialStepErrors); // Validation errors
    const [savedSyllabi, setSavedSyllabi] = useState([]);        // Unfinished syllabi
    const [saveSuccess, setSaveSuccess] = useState(false);       // Save success state
    const [saveError, setSaveError] = useState(false);           // Save error state
    const [saveTime, setSaveTime] = useState(null);              // Last save timestamp
    const [confirming, setConfirming] = useState(false);         // Delete confirmation

    const totalSteps = 6;                                        // Total form steps
    const modalProgress = (currentStep / totalSteps) * 100;      // Progress percentage
    /*---+---+---+--End of State Management Block---+---+---+--*/

    /*---+---+---+--Start of File Naming Block---+---+---+--*/
    const shortYear = formData.courseYear.slice(-2); 
    const termMap = {
        'Spring': 'Sp',
        'Fall': 'Fa',
        'Summer': 'Su'
    };
    const termAbbrev = termMap[formData.courseTerm] || formData.courseTerm;
    const fileName = `${shortYear}-${termAbbrev}-${formData.courseSection}.pdf`;
    /*---+---+---+--End of File Naming Block---+---+---+--*/

    /*---+---+---+--Start of Auth Effect Block---+---+---+--*/
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
    /*---+---+---+--End of Auth Effect Block---+---+---+--*/

    /*---+---+---+--Start of Data Loading Block---+---+---+--*/
    useEffect(() => {
        const loadData = async () => {
            const syllabi = await loadUnfinishedSyllabi(userId);
            setSavedSyllabi(syllabi);
        };
        if (userId) {
            loadData();
        }
    }, [userId]);
    /*---+---+---+--End of Data Loading Block---+---+---+--*/

    /*---+---+---+--Start of Form Handlers Block---+---+---+--*/
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClose = async () => {
        await handleSaveOnClose();
        setShowCreateModal(false);
        setSaveSuccess(false);
    };

    const handleSaveProgress = async () => {
        try {
            setSaveSuccess(false); 
            setSaveError(false);
            await saveUnfinishedSyllabus(formData, userId);
            const currentTime = new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit' });
            setSaveTime(currentTime);
            setSaveSuccess(true);
        } catch (error) {
            console.error('Save failed', error);
            setSaveError(true);
            setSaveSuccess(false);
        }
    };

    const handleSaveOnClose = async () => {
        try {
            await saveUnfinishedSyllabus(formData, userId);
        } catch (error) {
            console.error('Save failed', error);
        }
    };

    const handleContinueEditing = (syllabusData) => {
        setFormData(syllabusData.formData);
        setIsEditingUnfinishedSyllabus(true);
        setShowUnfinishedModal(false);
        setShowCreateModal(true);
    };

    const nextStep = () => {
        const currentStepErrors = stepErrors[currentStep];
        const hasErrors = Object.values(currentStepErrors).some(error => error !== '');
        if (!hasErrors && currentStep < 6) setCurrentStep(currentStep + 1); 
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleGenerateSyllabus = () => {
        setShowPDF(true);
        setSaveSuccess(false);
    };

    const handleStepValidation = (step, errors) => {
        setStepErrors((prevState) => ({
            ...prevState,
            [step]: errors
        }));
    };

    const isFormValid = Object.values(stepErrors).every(errors => 
        Object.values(errors).every(error => error === '')
    );

    const handleCreateAnotherSyllabus = () => {
        setFormData(initialFormData);
        setStepErrors(initialStepErrors);
        setShowPDF(false);
        setCurrentStep(1);
        setShowCreateModal(true);
    };

    const handleCreateNewSyllabus = () => {
        setFormData(initialFormData);
        setIsEditingUnfinishedSyllabus(false);
        setShowCreateModal(true);
    };

    const deleteUnfinishedSyllabus = async (syllabusId, userId) => {
        try {
            const syllabusDoc = doc(db, 'users', userId, 'unfinished_syllabi', syllabusId);
            await deleteDoc(syllabusDoc);
            setSavedSyllabi(prev => prev.filter(s => s.id !== syllabusId));
        } catch (error) {
            console.error('Error deleting unfinished syllabus:', error);
        }
    };

    const handleDelete = async (syllabus) => {
        if (!syllabus.id) {
            console.error('Missing syllabus ID, cannot delete.');
            return;
        }
        await deleteUnfinishedSyllabus(syllabus.id, userId);
    };

    const handleClick = (syllabus) => {
        if (confirming !== syllabus.id) {
            setConfirming(syllabus.id);
            setTimeout(() => setConfirming(null), 5000);
        } else {
            handleDelete(syllabus);
        }
    };
    /*---+---+---+--End of Form Handlers Block---+---+---+--*/

    /*---+---+---+--Start of Render Block---+---+---+--*/
    return (
        <Container>
            {!showPDF ? (
                <>
                    {/*---+---+---+--Start of Button Group Block---+---+---+--*/}
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
                    {/*---+---+---+--End of Button Group Block---+---+---+--*/

                    /*---+---+---+--Start of Creation Modal Block---+---+---+--*/}
                    <Modal
                        show={showCreateModal}
                        onHide={handleClose}
                        centered
                        className="custom-modal"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <div className="d-flex justify-content-between align-items-center w-100">
                                    <div>
                                        {isEditingUnfinishedSyllabus
                                            ? t("syllabusForm.modalContinue")
                                            : t("syllabusForm.modalCreate")}
                                        <div style={{ padding: '0.1rem' }}>
                                            <ProgressBar 
                                                striped 
                                                variant="success" 
                                                now={modalProgress} 
                                                label={`${Math.round(modalProgress)}%`} 
                                            />
                                        </div>
                                    </div>

                                    <div className="ms-3">
                                        {saveSuccess && (
                                            <Alert
                                                variant="success"
                                                onClose={() => setSaveSuccess(false)}
                                                className="save-alert" 
                                            >
                                                {`Progress last saved: ${saveTime || 'loading...'}`}
                                            </Alert>
                                        )}

                                        {saveError && (
                                            <Alert
                                                variant="danger"
                                                onClose={() => setSaveError(false)}
                                                className="save-alert"
                                            >
                                                {t("syllabusForm.saveError")}
                                            </Alert>
                                        )}
                                    </div>
                                </div>
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
                    {/*---+---+---+--End of Creation Modal Block---+---+---+--*/

                    /*---+---+---+--Start of Unfinished Modal Block---+---+---+--*/}
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
                    {/*---+---+---+--End of Unfinished Modal Block---+---+---+--*/}
                </>
            ) : (
                /*---+---+---+--Start of PDF Preview Block---+---+---+--*/
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
                /*---+---+---+--End of PDF Preview Block---+---+---+--*/
            )}
        </Container>
    );
    /*---+---+---+--End of Render Block---+---+---+--*/
}
/*---+---+---+--End of Component Block---+---+---+--*/

export default SyllabusForm;  // Makes component available to routing

/*---+---+---+--End of SyllabusForm.jsx Block---+---+---+--*/