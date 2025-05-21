/*---+---+---+--Start of SyllabusPDF.jsx Block---+---+---+--*/

/**
 * SyllabusPDF.jsx - PDF Generator Component
 * This component:
 * - Generates a professional syllabus PDF using react-pdf
 * - Organizes content into standard syllabus sections
 * - Handles dynamic data from form inputs
 * - Includes university branding and required policies
 */

import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { academicInfo, studentHealth, additionalPolicy, universityMission } from './StaticSyllabusText';
import logo from '/images/lewis-banner.png';

/*---+---+---+--Start of Styles Block---+---+---+--*/
/**
 * styles - PDF Styling Definitions
 * Contains all visual styling for the PDF document
 * Organized by:
 * - Base page styles
 * - Typography styles
 * - Table styles
 * - Specialized component styles
 */
const styles = StyleSheet.create({
    // Base page styling
    page: { padding: 30, fontSize: 12 },
    section: { marginBottom: 10 },
    
    // Typography styles
    title: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
    heading: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
    text: { marginBottom: 15 },
    boldItalic: { fontFamily: 'Helvetica-BoldOblique', fontSize: 12 },
    tabText: { marginLeft: 25 },
    divider: { borderBottomWidth: 1, borderBottomColor: '#000', marginVertical: 5 },

    // Main table styles
    table: { 
        display: "table", 
        width: "100%", 
        borderCollapse: "collapse", 
        marginTop: 10 
    },
    tableRow: { 
        flexDirection: "row", 
        borderBottomWidth: 1, 
        borderBottomColor: '#000' 
    },
    tableHeader: { 
        backgroundColor: '#eaeaea', 
        fontWeight: "bold" 
    },
    tableCell: { 
        padding: 5, 
        flex: 1, 
        borderRightWidth: 1, 
        borderRightColor: '#000' 
    },
    lastCell: { 
        borderRightWidth: 0 
    },

    // Grading table specific styles
    gradingTable: { 
        display: "table", 
        width: "60%", 
        borderCollapse: "collapse", 
        marginTop: 5,
    },
    gradingTableRow: { 
        flexDirection: "row", 
        borderBottomWidth: 1, 
        borderBottomColor: '#000' 
    },
    gradingTableHeader: { 
        backgroundColor: '#eaeaea', 
        fontWeight: "bold", 
        fontSize: 8, 
        paddingVertical: 4,
    },
    gradingTableCell: { 
        padding: 4, 
        width: "50%", 
        borderRightWidth: 1, 
        borderRightColor: '#000', 
        fontSize: 8, 
        paddingVertical: 4,
    },
    gradingTableLastCell: { 
        borderRightWidth: 0 
    },

    // Header styles
    header: {
        flexDirection: 'column', 
        alignItems: 'center',     
        justifyContent: 'center', 
        textAlign: 'center',      
    },
    image: {
        width: 200,
        height: 70,
        marginRight: 15,
    },
});
/*---+---+---+--End of Styles Block---+---+---+--*/


/*---+---+---+--Start of Helper Functions Block---+---+---+--*/
/**
 * calculateGradeTotals - Grade Calculation Utility
 * Computes summary statistics for grade breakdown
 * @param {Array} data - Grade breakdown array from form
 * @returns {Object} - Contains totalNumber, totalPoints, totalPercent
 */
const calculateGradeTotals = (data) => {
    let totalNumber = 0;
    let totalPoints = 0;
    let totalPercent = 0;

    data.forEach(row => {
        totalNumber += parseFloat(row.number) || 0;
        totalPoints += parseFloat(row.totalPoints) || 0;
        totalPercent += parseFloat(row.percent) || 0;
    });

    return { totalNumber, totalPoints, totalPercent };
};
/*---+---+---+--End of Helper Functions Block---+---+---+--*/


/*---+---+---+--Start of Main Component Block---+---+---+--*/
/**
 * SyllabusPDF - PDF Generation Component
 * @param {Object} formData - Contains all syllabus data from form inputs
 * @returns {Document} - Fully formatted PDF document
 */
const SyllabusPDF = ({ formData }) => {
    const totals = calculateGradeTotals(formData.gradeBreakdown || []);
    
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                
                {/*---+---+---+--Start of Header Block---+---+---+--*/}
                <View style={styles.header}>
                    {/* University Logo */}
                    <Image style={styles.image} src={logo} />                
                    
                    {/* Course Information */}
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.bold}>{formData.courseName}</Text>
                    </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.bold}>{formData.courseSectionNumber}</Text>
                    </Text>      
                </View>
                {/*---+---+---+--End of Header Block---+---+---+--*/}

                {/*---+---+---+--Start of Instructor Info Block---+---+---+--*/}
                <View style={styles.section}>
                    <Text style={styles.heading}>I.     Instructor Information</Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Instructor's Name:</Text> {formData.instructorName}
                    </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Office Hours:</Text> {formData.officeHours}
                    </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Lewis Office Location:</Text> {formData.officeLocation}
                    </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Appointments:</Text> {formData.appointments}
                    </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Lewis Email:</Text> {formData.instructorEmail}
                    </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Lewis Phone Number:</Text> {formData.instructorPhone}
                    </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Zoom Link:</Text> {formData.zoomLink}
                    </Text>
                </View>
                {/*---+---+---+--End of Instructor Info Block---+---+---+--*/}

                {/*---+---+---+--Start of Course Info Block---+---+---+--*/}
                <View style={styles.section}>
                    <Text style={styles.heading}>II.    Course Information</Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Course:</Text> {formData.courseName}
                    </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Credit Hours:</Text> {formData.creditHours}
                    </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Description:</Text> {formData.courseDescription}
                    </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Prerequisites:</Text> {formData.prerequisites}
                    </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Course Meeting Times:</Text> {formData.courseTimes}
                    </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Course Meeting Dates:</Text> {formData.courseDates}
                    </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Meeting Location:</Text> {formData.meetingLocation}
                    </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Course Final:</Text> {formData.finalDate}
                    </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Student Learning Outcomes:</Text> {formData.learningOutcomes}
                    </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Baccalaureate Characteristics:</Text> {formData.bacCharactersitics}
                    </Text>
                </View>
                {/*---+---+---+--End of Course Info Block---+---+---+--*/}

                {/*---+---+---+--Start of Mission Block---+---+---+--*/}
                <View style={styles.section}>
                    <Text style={styles.heading}>III.   University Mission Statement</Text>
                    <Text style={[styles.text, styles.tabText]}>{universityMission.uniMission} </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>How this course connects to the University Mission:</Text> {formData.uMission}
                    </Text>
                </View>
                {/*---+---+---+--End of Mission Block---+---+---+--*/}

                {/*---+---+---+--Start of Materials Block---+---+---+--*/}
                <View style={styles.section}>
                    <Text style={styles.heading}>IV.    Course Materials</Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Textbook:</Text> {formData.textbooks}
                    </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Supplemental readings, videos, online materials:</Text> {formData.suppleMats}
                    </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Hardware and software requirements:</Text> {formData.softwareHardware}
                    </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Other required materials or costs:</Text> {formData.otherMaterials}
                    </Text>
                </View>
                {/*---+---+---+--End of Materials Block---+---+---+--*/}

                {/*---+---+---+--Start of Methods Block---+---+---+--*/}
                <View style={styles.section}>
                    <Text style={styles.heading}>V.    Instructional Methods and Activities</Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Modality of Instruction:</Text> {formData.modalityInstruction}
                    </Text>
                </View>
                {/*---+---+---+--End of Methods Block---+---+---+--*/}

                {/*---+---+---+--Start of Schedule Block---+---+---+--*/}
                <View style={styles.section}>
                    <Text style={styles.heading}>VI.    Course Schedule</Text>
                    <Text style={[styles.text, styles.tabText]}>Schedule: {formData.scheduleDesc}</Text>

                    <Text style={styles.title}>Schedule Breakdown</Text>
                    <View style={styles.table}>
                        {/* Table Header */}
                        <View style={[styles.tableRow, styles.tableHeader]}>
                            <Text style={styles.tableCell}>Week</Text>
                            <Text style={styles.tableCell}>Topics</Text>
                            <Text style={[styles.tableCell, styles.lastCell]}>Assignments</Text>
                        </View>

                        {/* Table Rows*/}
                        {formData.schedule.map((row, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableCell}>{row.week}</Text>
                                <Text style={styles.tableCell}>{row.topics}</Text>
                                <Text style={[styles.tableCell, styles.lastCell]}>{row.assignments}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.divider} />
                    <Text style={[styles.text, styles.tabText]}>Schedule Changes: {formData.scheduleChanges}</Text>
                </View>
                {/*---+---+---+--End of Schedule Block---+---+---+--*/}

                {/*---+---+---+--Start of Grading Block---+---+---+--*/}
                <View style={styles.section}>
                    <Text style={styles.heading}>VII.   Grading Criteria and Course Policies</Text>
                    <Text style={[styles.text, styles.tabText]}>Grading Policies: {formData.gradingPolicy}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.text, styles.tabText]}>Course Grade: {'The course grade will be based on the following.'}</Text>
                </View>

                <View style={styles.gradingTable}>
                    {/* Table Header */}
                    <View style={[styles.gradingTableRow, styles.gradingTableHeader]}>
                        <Text style={styles.gradingTableCell}>Assignment</Text>
                        <Text style={styles.gradingTableCell}>Points</Text>
                        <Text style={styles.gradingTableCell}>#</Text>
                        <Text style={styles.gradingTableCell}>Total Points</Text>
                        <Text style={[styles.gradingTableCell, styles.gradingTableLastCell]}>% of Grade</Text>
                    </View>

                    {/* Table Rows */}
                    {formData.gradeBreakdown && formData.gradeBreakdown.map((row, index) => (
                        <View key={index} style={styles.gradingTableRow}>
                            <Text style={styles.gradingTableCell}>{row.assignment}</Text>
                            <Text style={styles.gradingTableCell}>{row.points}</Text>
                            <Text style={styles.gradingTableCell}>{row.number}</Text>
                            <Text style={styles.gradingTableCell}>{row.totalPoints}</Text>
                            <Text style={[styles.gradingTableCell, styles.gradingTableLastCell]}>{row.percent}</Text>
                        </View>
                    ))}

                    {/* Totals Row */}
                    <View style={styles.gradingTableRow}>
                        <Text style={styles.gradingTableCell}><Text style={{ fontWeight: 'bold' }}>Total</Text></Text>
                        <Text style={styles.gradingTableCell}></Text>
                        <Text style={styles.gradingTableCell}>{totals.totalNumber}</Text>
                        <Text style={styles.gradingTableCell}>{totals.totalPoints}</Text>
                        <Text style={[styles.gradingTableCell, styles.gradingTableLastCell]}>{totals.totalPercent}</Text>
                    </View>
                </View>

                {/* Grading Scale */}
                <View style={styles.section}>
                    <Text style={styles.title}>Grading Scale</Text>
                    <View style={styles.gradingTable}>
                        {/* Table Header */}
                        <View style={[styles.gradingTableRow, styles.gradingTableHeader]}>
                            <Text style={styles.gradingTableCell}>Score Range</Text>
                            <Text style={styles.gradingTableCell}>Letter Grade</Text>
                        </View>

                        {/* Table Rows */}
                        {formData.gradingScale.map((row, index) => (
                        <View key={index} style={styles.gradingTableRow}>
                            <Text style={styles.gradingTableCell}>{row.score}</Text>
                            <Text style={styles.gradingTableCell}>{row.letterGrade}</Text>
                        </View>
                        ))}
                    </View>

                    <View style={styles.divider} />
                    <Text style={[styles.text, styles.tabText]}>Course Policies: {formData.coursePolicy}</Text>
                </View>
                {/*---+---+---+--End of Grading Block---+---+---+--*/}

                {/*---+---+---+--Start of Academic Info Block---+---+---+--*/}
                <View style={styles.section}>
                    <Text style={styles.heading}>VIII.    Academic Information for Students</Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Requests for Reasonable Accommodations:</Text> {academicInfo.academicInfoStudents}
                    </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Academic Integrity:</Text> {academicInfo.academicIntegrity}
                    </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Coursera Career Academy:</Text> {academicInfo.courseCareerAcademy}
                    </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Responsiveness to Change:</Text> {academicInfo.responsiveChange}
                    </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Online and Hybrid Learning:</Text> {academicInfo.onlineAndHybridLearning}
                    </Text>
                </View>
                {/*---+---+---+--End of Academic Info Block---+---+---+--*/}

                {/*---+---+---+--Start of Health Block---+---+---+--*/}
                <View style={styles.section}>
                    <Text style={styles.heading}>IX.    Student Health, Wellness, and Community Standards</Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Sanctified Zone:</Text> {studentHealth.sanctifiedZone}
                    </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Violence Prevention:</Text> {studentHealth.violencePrevention}
                    </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Mandatory Reporting:</Text> {studentHealth.mandatoryReporting}
                    </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Student Wellness Center:</Text> {studentHealth.wellnessCenter}
                    </Text>
                    <Text style={[styles.text, styles.tabText]}>
                        <Text style={styles.boldItalic}>Timely Care:</Text> {studentHealth.timelyCare}
                    </Text>
                </View>
                {/*---+---+---+--End of Health Block---+---+---+--*/}

                {/*---+---+---+--Start of Policies Block---+---+---+--*/}
                <View style={styles.section}>
                    <Text style={styles.heading}>X.    Additional Policy and Resources</Text>
                    <Text style={[styles.text, styles.tabText]}>{additionalPolicy.additionalPolicies} </Text>
                </View>
                {/*---+---+---+--End of Policies Block---+---+---+--*/}

            </Page>        
        </Document> 
    );
};
/*---+---+---+--End of Main Component Block---+---+---+--*/

export default SyllabusPDF;
/*---+---+---+--End of SyllabusPDF.jsx Block---+---+---+--*/