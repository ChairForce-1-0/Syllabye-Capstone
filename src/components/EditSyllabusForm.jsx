/*---+---+---+--Start of EditSyllabusForm.jsx Block---+---+---+--*/

/**
 * EditSyllabusForm.jsx - The Syllabus Editor Component
 * This component provides:
 * - Multi-step syllabus editing form
 * - Real-time form validation
 * - PDF generation and preview
 * - Syllabus upload/download functionality
 * - Modal-based interface for editing
 */

/*---+---+---+--Start of Imports Block---+---+---+--*/
import React, { useState, useEffect } from 'react';                     // Core React functionality
import { Button, Modal, Form, Container } from 'react-bootstrap';      // UI components
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';      // PDF handling
import InstructorInfo from './InstructorInfo';                         // Form section components
import CourseInfo from './CourseInfo';
import CourseMaterials from './CourseMaterials';
import CourseSchedule from './CourseSchedule';
import CoursePolicy from './CoursePolicy';
import SyllabusPDF from './SyllabusPDF';                               // PDF generator
import SyllabusUploader from './SyllabusUploader';                     // Cloud upload
import CoursePolicyCont from './CoursePolicyCont';                     // Additional policy section
import './SyllabusForm.css';                                           // Component styles
/*---+---+---+--End of Imports Block---+---+---+--*/


/*---+---+---+--Start of Component Block---+---+---+--*/
function SyllabusForm({ showModal, handleClose, initialData = null }) {
    /*---+---+---+--Start of State Management Block---+---+---+--*/
    const [showPDF, setShowPDF] = useState(false);          // Toggles PDF preview visibility
    const [currentStep, setCurrentStep] = useState(1);      // Current form step (1-6)
    
    // Default empty form structure
    const defaultFormData = {
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

    const [formData, setFormData] = useState(initialData || defaultFormData);

    // Form validation errors by step
    const [stepErrors, setStepErrors] = useState({
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
    });
    /*---+---+---+--End of State Management Block---+---+---+--*/


    /*---+---+---+--Start of Effects Block---+---+---+--*/
    // Sync form data when initialData changes (Firestore load)
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);
    /*---+---+---+--End of Effects Block---+---+---+--*/


    /*---+---+---+--Start of Helper Functions Block---+---+---+--*/
    // Generate standardized filename from course data
    const shortYear = formData.courseYear.slice(-2);
    const termMap = { 'Spring': 'Sp', 'Fall': 'Fa', 'Summer': 'Su' };
    const termAbbrev = termMap[formData.courseTerm] || formData.courseTerm;
    const fileName = `${shortYear}-${termAbbrev}-${formData.courseSection}.pdf`;

    // Handle form field changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Navigate to next form step if no validation errors
    const nextStep = () => {
        const currentStepErrors = stepErrors[currentStep];
        const hasErrors = Object.values(currentStepErrors).some(error => error !== '');

        if (!hasErrors && currentStep < 6) {
            setCurrentStep(currentStep + 1);
        }
    };

    // Navigate to previous form step
    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    // Toggle PDF preview visibility
    const handleGenerateSyllabus = () => {
        setShowPDF(true);
    };

    // Update validation errors for specific step
    const handleStepValidation = (step, errors) => {
        setStepErrors((prevState) => ({
            ...prevState,
            [step]: errors
        }));
    };

    // Check if entire form is valid
    const isFormValid = Object.values(stepErrors).every(errors =>
        Object.values(errors).every(error => error === '')
    );
    /*---+---+---+--End of Helper Functions Block---+---+---+--*/


    /*---+---+---+--Start of Render Block---+---+---+--*/
    return (
        <Container>
            {!showPDF ? (
                /*---+---+---+--Start of Form Modal Block---+---+---+--*/
                <>
                    <Modal show={showModal} onHide={handleClose} centered className="custom-modal">
                        <Modal.Header closeButton>
                            <Modal.Title>{initialData ? "Edit Syllabus" : "Create Syllabus"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                {/* Dynamic form section rendering based on current step */}
                                {currentStep === 1 && <InstructorInfo formData={formData} handleChange={handleChange} onValidation={(errors) => handleStepValidation(1, errors)} />}
                                {currentStep === 2 && <CourseInfo formData={formData} handleChange={handleChange} onValidation={(errors) => handleStepValidation(2, errors)} />}
                                {currentStep === 3 && <CourseMaterials formData={formData} handleChange={handleChange} onValidation={(errors) => handleStepValidation(3, errors)} />}
                                {currentStep === 4 && <CourseSchedule formData={formData} handleChange={handleChange} onValidation={(errors) => handleStepValidation(4, errors)} />}
                                {currentStep === 5 && <CoursePolicy formData={formData} handleChange={handleChange} onValidation={(errors) => handleStepValidation(5, errors)} />}
                                {currentStep === 6 && <CoursePolicyCont formData={formData} handleChange={handleChange} onValidation={(errors) => handleStepValidation(6, errors)} />}
                            </Form>
                        </Modal.Body>
                        <Modal.Footer className="d-flex justify-content-between">
                            <Button variant="danger" onClick={handleClose} className="open-modal-button">
                                Close
                            </Button>
                            <div>
                                <Button variant="secondary" onClick={prevStep} disabled={currentStep === 1} className="open-modal-button me-2">
                                    Previous
                                </Button>
                                <Button variant="primary" onClick={nextStep} disabled={currentStep === 6} className="open-modal-button">
                                    Next
                                </Button>
                            </div>
                            <Button
                                variant="primary"
                                onClick={handleGenerateSyllabus}
                                className={`open-modal-button ms-2 ${currentStep !== 6 || !isFormValid ? 'opacity-50' : ''}`}
                                disabled={currentStep !== 6 || !isFormValid}
                            >
                                Generate Syllabus
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
                /*---+---+---+--End of Form Modal Block---+---+---+--*/
            ) : (
                /*---+---+---+--Start of PDF Preview Block---+---+---+--*/
                <>
                    <h2 className="text-center mt-4">Syllabus Preview</h2>
                    <PDFViewer style={{ width: '100%', height: '500px' }}>
                        <SyllabusPDF formData={formData} />
                    </PDFViewer>
                    <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                        <PDFDownloadLink document={<SyllabusPDF formData={formData} />} fileName={fileName} className="open-modal-button">
                            {({ loading }) => (loading ? 'Preparing PDF...' : 'Download Syllabus')}
                        </PDFDownloadLink>
                        <SyllabusUploader formData={formData} />
                    </div>
                </>
                /*---+---+---+--End of PDF Preview Block---+---+---+--*/
            )}
        </Container>
    );
    /*---+---+---+--End of Render Block---+---+---+--*/
}
/*---+---+---+--End of Component Block---+---+---+--*/

export default SyllabusForm;  // Makes component available to parent components

/*---+---+---+--End of EditSyllabusForm.jsx Block---+---+---+--*/