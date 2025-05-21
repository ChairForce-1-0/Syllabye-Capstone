/*---+---+---+--Start of CourseMaterials.jsx Block---+---+---+--*/

/**
 * CourseMaterials.jsx - Course Materials Form Component
 * Handles input and validation for all course material requirements
 * Features:
 * - Form fields for textbooks, software, and other materials
 * - Real-time validation
 * - Error messaging
 * - Dynamic textarea fields
 */

import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

function CourseMaterials({ formData, handleChange, onValidation }) {
    /*---+---+---+--Start of State & Validation Block---+---+---+--*/
    // Initialize error state for all material fields
    const [errors, setErrors] = useState({
        textbooks: '',
        suppleMats: '',
        softwareHardware: '',
        otherMaterials: '',
    });
    /*---+---+---+--End of State & Validation Block---+---+---+--*/


    /*---+---+---+--Start of Validation Effect Block---+---+---+--*/
    /**
     * Validates course materials data whenever it changes
     * Checks for required fields
     * Updates error state and notifies parent component
     */
    useEffect(() => {
        const validationRules = [
            { 
                name: 'textbooks', 
                label: 'Textbooks', 
                value: formData.textbooks 
            },
            { 
                name: 'suppleMats', 
                label: 'Supplemental readings, videos, online materials', 
                value: formData.suppleMats 
            },
            { 
                name: 'softwareHardware', 
                label: 'Hardware and Software Requirements', 
                value: formData.softwareHardware 
            },
            { 
                name: 'otherMaterials', 
                label: 'Other required materials or costs', 
                value: formData.otherMaterials 
            },
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
        onValidation(newErrors); // Notify parent component of validation status
    }, [formData, onValidation]);
    /*---+---+---+--End of Validation Effect Block---+---+---+--*/


    /*---+---+---+--Start of Form Fields Configuration Block---+---+---+--*/
    /**
     * formFields - Defines all material fields and their properties
     * Centralized configuration for dynamic form rendering
     */
    const formFields = [
        { 
            label: 'Textbook', 
            name: 'textbooks', 
            placeholder: 'Enter the textbooks or resources for the course' 
        },
        { 
            label: 'Supplemental readings, videos, online materials', 
            name: 'suppleMats', 
            placeholder: 'Enter any information about additional links' 
        },
        { 
            label: 'Hardware and Software Requirements', 
            name: 'softwareHardware', 
            placeholder: 'Enter any information about hardware/software that may be needed' 
        },
        { 
            label: 'Other required materials or costs', 
            name: 'otherMaterials', 
            placeholder: 'Enter any other required materials/costs' 
        }
    ];
    /*---+---+---+--End of Form Fields Configuration Block---+---+---+--*/


    /*---+---+---+--Start of Render Block---+---+---+--*/
    return (
        <div className="section">
            <h4>Course Materials</h4>
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
        </div>
    );
    /*---+---+---+--End of Render Block---+---+---+--*/
}

export default CourseMaterials;

/*---+---+---+--End of CourseMaterials.jsx Block---+---+---+--*/