/*---+---+---+--Start of CoursePolicy.jsx Block---+---+---+--*/

/**
 * CoursePolicy.jsx - Course Policies Component
 * Handles input for course policies and grading scale
 * Features:
 * - Policy text areas with validation
 * - Interactive grading scale table
 * - Dynamic row management
 * - Real-time validation
 */

import React, { useState, useEffect } from 'react';
import { Form, Table, Button } from 'react-bootstrap';

function CoursePolicy({ formData, handleChange, onValidation }) {
    /*---+---+---+--Start of State & Validation Block---+---+---+--*/
    // Initialize error state for policy fields
    const [errors, setErrors] = useState({
        gradingPolicy: '',
        coursePolicy: '',
        assignmentAndGradeChanges: '',
    });

    // Initialize grading scale with default values
    const [gradingScale, setGradingScale] = useState(formData.gradingScale || [
        { score: '93-100%', letterGrade: 'A' },
        { score: '90-92.9%', letterGrade: 'A-' },
        { score: '87-89.9%', letterGrade: 'B+' },
        { score: '83-86.9%', letterGrade: 'B' },
        { score: '80-82.9%', letterGrade: 'B-' },
        { score: '77-79.9%', letterGrade: 'C+' },
        { score: '73-76.9%', letterGrade: 'C' },
        { score: '70-72.9%', letterGrade: 'C-' },
        { score: '67-69.9%', letterGrade: 'D+' },
        { score: '63-66.9%', letterGrade: 'D' },
        { score: '60-62.9%', letterGrade: 'D-' },
        { score: '0-59.9%', letterGrade: 'F' },
    ]);
    /*---+---+---+--End of State & Validation Block---+---+---+--*/


    /*---+---+---+--Start of Validation Effect Block---+---+---+--*/
    /**
     * Validates policy fields whenever form data changes
     * Checks for required fields
     * Updates error state and notifies parent component
     */
    useEffect(() => {
        const validationRules = [
            { name: 'gradingPolicy', label: 'Grading Policies', value: formData.gradingPolicy || '' },
            { name: 'coursePolicy', label: 'Course Policies', value: formData.coursePolicy || '' },
            { name: 'assignmentAndGradeChanges', label: 'Assignment/Grade Changes', value: formData.assignmentAndGradeChanges || '' },
        ];
    
        const newErrors = validationRules.reduce((acc, field) => {
            if (!field.value.trim()) {
                acc[field.name] = `${field.label} is required`;
            } else {
                acc[field.name] = '';
            }
            return acc;
        }, {});
    
        setErrors(newErrors);
        onValidation(newErrors);
    }, [formData, onValidation]);
    /*---+---+---+--End of Validation Effect Block---+---+---+--*/


    /*---+---+---+--Start of Grading Scale Handlers Block---+---+---+--*/
    /**
     * Handles changes to grading scale table cells
     * @param {Object} e - Change event
     * @param {number} index - Row index being modified
     */
    const handleGradingScaleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedGradingScale = [...gradingScale];
        updatedGradingScale[index][name] = value;
        setGradingScale(updatedGradingScale);
    };

    // Adds a new empty row to the grading scale
    const handleAddRow = () => {
        setGradingScale([...gradingScale, { score: '', letterGrade: '' }]);
    };

    // Removes a row from the grading scale
    const handleRemoveRow = (index) => {
        const updatedGradingScale = gradingScale.filter((_, i) => i !== index);
        setGradingScale(updatedGradingScale);
    };

    // Updates parent form when grading scale changes
    React.useEffect(() => {
        handleChange({ target: { name: 'gradingScale', value: gradingScale } });
    }, [gradingScale, handleChange]);
    /*---+---+---+--End of Grading Scale Handlers Block---+---+---+--*/


    /*---+---+---+--Start of Form Fields Configuration Block---+---+---+--*/
    /**
     * formFields - Defines all policy text areas and their properties
     */
    const formFields = [
        { 
            label: 'Grading Policies', 
            name: 'gradingPolicy', 
            placeholder: 'Enter your grading policy here. (ex: late policy)' 
        },
        { 
            label: 'Course Policies', 
            name: 'coursePolicy', 
            placeholder: 'Enter your course policies here. (ex: attendance & technology use)' 
        },
        { 
            label: 'Assignment/Grade Changes', 
            name: 'assignmentAndGradeChanges', 
            placeholder: 'Enter how changes to assignments/grades will be communicated' 
        },
    ];
    /*---+---+---+--End of Form Fields Configuration Block---+---+---+--*/


    /*---+---+---+--Start of Render Block---+---+---+--*/
    return (
        <div className="section">
            <h4>Grading/Course Policies</h4>

            {/* Policy Text Areas */}
            {formFields.map((field) => (
                <Form.Group controlId={field.name} key={field.name}>
                    <Form.Label>{field.label}</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
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

            {/* Grading Scale Table */}
            <h4>Grading Scale</h4>
            <Table bordered responsive>
                <thead>
                    <tr>
                        <th>Score Range</th>
                        <th>Letter Grade</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {gradingScale.map((row, index) => (
                        <tr key={index}>
                            <td>
                                <Form.Control
                                    type="text"
                                    name="score"
                                    value={row.score}
                                    onChange={(e) => handleGradingScaleChange(e, index)}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    name="letterGrade"
                                    value={row.letterGrade}
                                    onChange={(e) => handleGradingScaleChange(e, index)}
                                />
                            </td>
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => handleRemoveRow(index)}
                                    disabled={gradingScale.length === 1}
                                >
                                    Remove
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Button variant="success" onClick={handleAddRow}>
                Add Row
            </Button>
        </div>
    );
    /*---+---+---+--End of Render Block---+---+---+--*/
}

export default CoursePolicy;

/*---+---+---+--End of CoursePolicy.jsx Block---+---+---+--*/