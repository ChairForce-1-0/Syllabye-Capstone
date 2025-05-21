/*---+---+---+--Start of CoursePolicyCont.jsx Block---+---+---+--*/

/**
 * CoursePolicyCont.jsx - Course Policies Continued Component
 * Handles the grade breakdown section of course policies
 * Features:
 * - Interactive grade breakdown table
 * - Dynamic row management
 * - Automatic total calculations
 * - Real-time updates to parent form
 */

import React, { useState, useEffect } from 'react';
import { Form, Table, Button } from 'react-bootstrap';

function CoursePolicyCont({ formData, handleChange, onValidation }) {
    /*---+---+---+--Start of State Initialization Block---+---+---+--*/
    // Initialize grade breakdown with empty row if no existing data
    const [gradeBreakdown, setGradeBreakdown] = useState(formData.gradeBreakdown || [
        { assignment: '', points: '', number: '', totalPoints: '', percent: '' },
    ]);
    /*---+---+---+--End of State Initialization Block---+---+---+--*/


    /*---+---+---+--Start of Table Handlers Block---+---+---+--*/
    /**
     * Handles changes to grade breakdown table cells
     * @param {Object} e - Change event
     * @param {number} index - Row index being modified
     */
    const handleGradeBreakdownChange = (e, index) => {
        const { name, value } = e.target;
        const updatedGradeBreakdown = [...gradeBreakdown];
        updatedGradeBreakdown[index][name] = value;
        setGradeBreakdown(updatedGradeBreakdown);
    };

    // Adds a new empty row to the grade breakdown table
    const handleAddRow = () => {
        setGradeBreakdown([
            ...gradeBreakdown,
            { assignment: '', points: '', number: '', totalPoints: '', percent: '' },
        ]);
    };

    // Removes a row from the grade breakdown table
    const handleRemoveRow = (index) => {
        const updatedGradeBreakdown = gradeBreakdown.filter((_, i) => i !== index);
        setGradeBreakdown(updatedGradeBreakdown);
    };
    /*---+---+---+--End of Table Handlers Block---+---+---+--*/


    /*---+---+---+--Start of Calculation Block---+---+---+--*/
    /**
     * Calculates totals for number, points, and percentage columns
     * @returns {Object} Totals for each calculated column
     */
    const calculateTotals = () => {
        let totalNumber = 0;
        let totalPoints = 0;
        let totalPercent = 0;

        gradeBreakdown.forEach(row => {
            totalNumber += parseFloat(row.number) || 0;
            totalPoints += parseFloat(row.totalPoints) || 0;
            totalPercent += parseFloat(row.percent) || 0;
        });

        return {
            totalNumber,
            totalPoints,
            totalPercent,
        };
    };

    const totals = calculateTotals();
    /*---+---+---+--End of Calculation Block---+---+---+--*/


    /*---+---+---+--Start of Parent Update Block---+---+---+--*/
    // Updates parent form when grade breakdown changes
    React.useEffect(() => {
        handleChange({ target: { name: 'gradeBreakdown', value: gradeBreakdown } });
    }, [gradeBreakdown, handleChange]);
    /*---+---+---+--End of Parent Update Block---+---+---+--*/


    /*---+---+---+--Start of Render Block---+---+---+--*/
    return (
        <div className="section">
            <h4>Grading/Course Policies Continued</h4>

            <h4>Grade Breakdown</h4>
            <Table bordered responsive>
                <thead>
                    <tr>
                        <th>Assignment</th>
                        <th>Points</th>
                        <th>#</th>
                        <th>Total Points</th>
                        <th>% of Grade</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Dynamic rows for grade breakdown */}
                    {gradeBreakdown.map((row, index) => (
                        <tr key={index}>
                            <td>
                                <Form.Control
                                    type="text"
                                    name="assignment"
                                    value={row.assignment}
                                    onChange={(e) => handleGradeBreakdownChange(e, index)}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    name="points"
                                    value={row.points}
                                    onChange={(e) => handleGradeBreakdownChange(e, index)}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    name="number"
                                    value={row.number}
                                    onChange={(e) => handleGradeBreakdownChange(e, index)}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    name="totalPoints"
                                    value={row.totalPoints}
                                    onChange={(e) => handleGradeBreakdownChange(e, index)}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    name="percent"
                                    value={row.percent}
                                    onChange={(e) => handleGradeBreakdownChange(e, index)}
                                />
                            </td>
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => handleRemoveRow(index)}
                                    disabled={gradeBreakdown.length === 1}
                                >
                                    Remove
                                </Button>
                            </td>
                        </tr>
                    ))}
                    
                    {/* Totals row */}
                    <tr>
                        <td><strong>Total</strong></td>
                        <td></td>
                        <td>{totals.totalNumber}</td>
                        <td>{totals.totalPoints}</td>
                        <td>{totals.totalPercent}</td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>

            <Button variant="success" onClick={handleAddRow}>
                Add Row
            </Button>
        </div>
    );
    /*---+---+---+--End of Render Block---+---+---+--*/
}

export default CoursePolicyCont;

/*---+---+---+--End of CoursePolicyCont.jsx Block---+---+---+--*/