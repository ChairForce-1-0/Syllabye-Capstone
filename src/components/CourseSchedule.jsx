/*---+---+---+--Start of CourseSchedule.jsx Block---+---+---+--*/

/**
 * CourseSchedule.jsx - The Course Schedule Management Component
 * This component handles:
 * - Dynamic week-by-week course schedule creation
 * - Form validation for schedule descriptions
 * - Add/remove functionality for schedule rows
 * - Integration with parent syllabus form
 */

/*---+---+---+--Start of Imports Block---+---+---+--*/
import React, { useState, useEffect } from 'react';       // Core React functionality
import { Table, Button, Form } from 'react-bootstrap';   // UI components
/*---+---+---+--End of Imports Block---+---+---+--*/


/*---+---+---+--Start of Component Block---+---+---+--*/
function CourseSchedule({ formData, handleChange, onValidation }) {
    /*---+---+---+--Start of State Management Block---+---+---+--*/
    const [errors, setErrors] = useState({
        scheduleChanges: '',    // Tracks schedule changes validation
        scheduleDesc: ''        // Tracks schedule description validation
    });

    const [schedule, setSchedule] = useState(
        formData.schedule || Array(8).fill(null).map(() => ({ 
            week: '',           // Week number/identifier
            topics: '',         // Weekly topics
            assignments: ''     // Weekly assignments
        }))
    );
    /*---+---+---+--End of State Management Block---+---+---+--*/


    /*---+---+---+--Start of Validation Block---+---+---+--*/
    useEffect(() => {
        const validationRules = [
            { name: 'scheduleChanges', label: 'Schedule Changes', value: formData.scheduleChanges },
            { name: 'scheduleDesc', label: 'Schedule Description', value: formData.scheduleDesc },
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
        onValidation(newErrors); // Notify SyllabusForm with errors for this step
    }, [formData, onValidation]);
    /*---+---+---+--End of Validation Block---+---+---+--*/


    /*---+---+---+--Start of Form Configuration Block---+---+---+--*/
    const formFields = [
        { 
            label: 'Schedule Description', 
            name: 'scheduleDesc', 
            placeholder: 'Enter a description for the course schedule' 
        },
        { 
            label: 'Schedule Changes', 
            name: 'scheduleChanges', 
            placeholder: 'Enter information about potential schedule changes' 
        },
    ];
    /*---+---+---+--End of Form Configuration Block---+---+---+--*/


    /*---+---+---+--Start of Schedule Management Block---+---+---+--*/
    const handleAddRow = () => {
        setSchedule([
            ...schedule,
            { week: '', topics: '', assignments: '' },
        ]);
    };

    const handleRemoveRow = (index) => {
        const newSchedule = schedule.filter((_, i) => i !== index);
        setSchedule(newSchedule);
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedSchedule = [...schedule]; // Clone the schedule
        updatedSchedule[index] = { ...updatedSchedule[index], [name]: value }; // Update specific field
        setSchedule(updatedSchedule); // Update state
    };

    // Update parent formData when schedule changes
    useEffect(() => {
        handleChange({ target: { name: 'schedule', value: schedule } });
    }, [schedule, handleChange]);
    /*---+---+---+--End of Schedule Management Block---+---+---+--*/


    /*---+---+---+--Start of Render Block---+---+---+--*/
    return (
        <div className="section">
            <h4>Course Schedule</h4>
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

            <h4>Week by Week Schedule</h4>
            {/*---+---+---+--Start of Schedule Table Block---+---+---+--*/}
            <Table bordered responsive>
                <thead>
                    <tr>
                        <th>Week</th>
                        <th>Topics</th>
                        <th>Assignments</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {schedule.map((row, index) => (
                        <tr key={index}>
                            <td>
                                <Form.Control
                                    type="text"
                                    name="week"
                                    value={row.week}
                                    onChange={(e) => handleInputChange(e, index)}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    name="topics"
                                    value={row.topics}
                                    onChange={(e) => handleInputChange(e, index)}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    name="assignments"
                                    value={row.assignments}
                                    onChange={(e) => handleInputChange(e, index)}
                                />
                            </td>
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => handleRemoveRow(index)}
                                    disabled={schedule.length === 1} // Prevent removing last row
                                >
                                    Remove
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/*---+---+---+--End of Schedule Table Block---+---+---+--*/}

            <Button variant="success" onClick={handleAddRow}>
                Add Row
            </Button>
        </div>
    );
    /*---+---+---+--End of Render Block---+---+---+--*/
}
/*---+---+---+--End of Component Block---+---+---+--*/

export default CourseSchedule;  // Makes component available to parent forms

/*---+---+---+--End of CourseSchedule.jsx Block---+---+---+--*/