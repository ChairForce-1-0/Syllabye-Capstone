/*---+---+---+--Start of InstructorInfo.jsx Block---+---+---+--*/

/**
 * InstructorInfo.jsx - The Instructor Information Form Component
 * This component provides:
 * - Form for entering instructor details
 * - Real-time field validation
 * - Required field indicators
 * - Error messaging
 * - Integration with parent syllabus form
 */

/*---+---+---+--Start of Imports Block---+---+---+--*/
import React, { useState, useEffect } from 'react';   // Core React functionality
import { Form } from 'react-bootstrap';              // Form UI components
/*---+---+---+--End of Imports Block---+---+---+--*/


/*---+---+---+--Start of Component Block---+---+---+--*/
function InstructorInfo({ formData, handleChange, onValidation }) {
    /*---+---+---+--Start of State Management Block---+---+---+--*/
    const [errors, setErrors] = useState({
        instructorName: '',      // Validation error for name field
        officeHours: '',         // Validation error for office hours
        officeLocation: '',      // Validation error for location
        instructorEmail: '',     // Validation error for email
        instructorPhone: '',     // Validation error for phone
        zoomLink: '',            // Validation error for Zoom link
    });
    /*---+---+---+--End of State Management Block---+---+---+--*/


    /*---+---+---+--Start of Validation Block---+---+---+--*/
    useEffect(() => {
        const validationRules = [
            { name: 'instructorName', label: "Instructor name", value: formData.instructorName },
            { name: 'officeHours', label: "Office hours", value: formData.officeHours },
            { name: 'officeLocation', label: "Office location", value: formData.officeLocation },
            { name: 'instructorEmail', label: "Instructor email", value: formData.instructorEmail },
            { name: 'instructorPhone', label: "Instructor phone", value: formData.instructorPhone },
            { name: 'zoomLink', label: "Zoom link", value: formData.zoomLink },
        ];

        const newErrors = validationRules.reduce((acc, field) => {
            if (field.name !== 'zoomLink' && !field.value.trim()) {
                acc[field.name] = `${field.label} is required`;
            } else {
                acc[field.name] = '';
            }
            return acc;
        }, {});

        setErrors(newErrors);
        onValidation(newErrors); // Notify parent form of validation state
    }, [formData, onValidation]);
    /*---+---+---+--End of Validation Block---+---+---+--*/


    /*---+---+---+--Start of Form Configuration Block---+---+---+--*/
    const formFields = [
        { label: "Instructor's Name", name: 'instructorName', placeholder: "Enter your name", required: true },
        { label: "Office Hours", name: 'officeHours', placeholder: "Enter when your office hours occur", required: true },
        { label: "Lewis Office Location", name: 'officeLocation', placeholder: "Enter where your office is located at Lewis University", required: true },
        { label: "Lewis Email", name: 'instructorEmail', placeholder: "Enter your Lewis email", required: true },
        { label: "Lewis Phone Number", name: 'instructorPhone', placeholder: "Enter your phone number", required: false },
        { label: "Zoom Link", name: 'zoomLink', placeholder: "Enter the link to your Zoom classroom if needed", required: false }
    ];
    /*---+---+---+--End of Form Configuration Block---+---+---+--*/


    /*---+---+---+--Start of Render Block---+---+---+--*/
    return (
        <div className="section">
            <h4>Instructor Information</h4>
            {formFields.map((field) => (
                <Form.Group controlId={field.name} key={field.name}>
                    <Form.Label>{field.label}</Form.Label>
                    <Form.Control
                        required={field.required}
                        type="text"
                        placeholder={field.placeholder}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        isInvalid={!!errors[field.name]}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors[field.name]}
                    </Form.Control.Feedback>
                </Form.Group>
            ))}
        </div>
    );
    /*---+---+---+--End of Render Block---+---+---+--*/
}
/*---+---+---+--End of Component Block---+---+---+--*/

export default InstructorInfo;  // Makes component available to parent forms

/*---+---+---+--End of InstructorInfo.jsx Block---+---+---+--*/