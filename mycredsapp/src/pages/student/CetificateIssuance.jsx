import React, { useState, useEffect } from 'react';
import CertificationModal from './CertificationModal';

const CertificateIssuance = () => {
    const [certificates, setCertificates] = useState([]);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedCertTemp, setSelectedCertTemp] = useState('');
    const [fields, setFields] = useState([]);  
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(''); 
    const [institutions, setInstitutions] = useState([]);
    const [selectedInstitution, setSelectedInstitution] = useState(''); 
    const [selectedInstitutionDetails, setSelectedInstitutionDetails] = useState({});
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedCourseDetails, setSelectedCourseDetails] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [institutionUrl, setInstitutionUrl] = useState('');
    const [institutionName, setInstitutionName] = useState('');
    const [institutionLogo, setInstitutionLogo] = useState('');
    const [courseId, setCourseId] = useState('');
    const [courseName, setCourseName] = useState('');
    const [totalHours, setTotalHours] = useState('');
    const [dateCompletion, setDateCompletion] = useState('');
    
    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const response = await fetch('http://localhost:3000/certificate');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(`tempate certificates: ${JSON.stringify(data)}`);
                setCertificates(data);
            } catch (error) {
                console.error('Error fetching certificates:', error);
            }
        };

        fetchCertificates();
    }, []);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:3000/students');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    // Effect to update institution details when selectedInstitution changes
    useEffect(() => {
        const institutionDetails = institutions.find(inst => inst.id === selectedInstitution);
        setSelectedInstitutionDetails(institutionDetails || {});
    }, [selectedInstitution, institutions]);

    // Effect to update course details when selectedCourse changes
    useEffect(() => {
        const courseDetails = courses.find(course => course.id === selectedCourse);
        setSelectedCourseDetails(courseDetails || {});
    }, [selectedCourse, courses]);

    const handleSelectedStudentChange = (event) => {
        setSelectedStudent(event.target.value);
    };

    // Fetch courses
    useEffect(() => {
        fetch('http://localhost:3000/courses')
            .then(response => response.json())
            .then(data => {
                console.log(`Courses: ${data}`)
                setCourses(data)
    })
            .catch(err => console.error('Error fetching courses:', err));
    }, []);

    
    const handleSelectTemplageChange = (event) => {
        setSelectedImage(event.target.value);
    };

     /* 
    * This function selects the image certificate based on the selected template list.
    * This has the json values for the field placements.
    */
     const handleSelectTemplateChange = async (e) => {
        const selectedId = e.target.value;
        //console.log('Selected ID:', selectedId);
        setSelectedCertTemp(selectedId);

        if (selectedId) {
            try {
                // Fetch the certificate data
                const response = await fetch(`http://localhost:3000/certificate/${selectedId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch certificate details');
                }
                const data = await response.json();
                // Fetch the actual image
                const imageUrl = `http://localhost:3000/certificate-image/${selectedId}`;
                setSelectedImage(imageUrl);

                // Unescape the JSON data
                const unescapedJson = data.image_json.replace(/\\'/g, "'").replace(/\\"/g, '"');
                
                // Parse the JSON data for field placements
                const fields = JSON.parse(unescapedJson);
                setFields(fields);
            }
            catch (error) {
                console.error('Error fetching certificate image:', error);
            }
            
        } else {
            setSelectedImage(''); // Clear the image if no selection
        }
    };

    const issueStudentCertificate = async (event) => {
        event.preventDefault();
        // Get institution and course names asynchronously and then construct payload
        Promise.all([
            // Promise to get institution name
            new Promise((resolve) => {
                const institution = institutions.find(inst => inst.id === institutions[selectedInstitution].institution_name);
                //console.log('Found Institution:', institutions[selectedInstitution].institution_name);
                setInstitutionName(institutions[selectedInstitution].institution_name)
                resolve(institutionName);
            }),
            // Promise to get course name
            new Promise((resolve) => {
                
                //console.log('Selected Course ID:', selectedCourse);
                const course = courses.find(c => c.id.toString() === selectedCourse);
                if (course) {
                    //console.log('Found Course:', course);
                    setCourseName(course.course_name);
                    resolve(course.course_name);
                } else {
                    console.log('No course found for ID:', selectedCourse);
                    resolve(''); // resolve with an empty string or appropriate default value
                }
                //resolve(course ? course : '');
            }),
            new Promise((resolve) => {
                //console.log('Selected Student:', selectedStudent);
                resolve(selectedStudent);
            })
        ]).then(([institutionName, courseName, selectedStudent]) => {
            const payload = {
                student: selectedStudent,
                institution_id: selectedInstitution,
                course_id: selectedCourse,
                institution_name: institutionName,
                course_name: courseName,
                institution_url: institutionUrl,
                total_hours: totalHours,
                date_completion: dateCompletion
            };
            //console.log('Payload:', payload);

            // Call your API to assign a certificate
            fetch(`http://localhost:3000/assign-certificate/${selectedStudent}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Certificate assigned:', JSON.stringify(data));
                // Handle success, maybe refresh the list of certifications or navigate away
            })
            .catch(err => {
                console.error('Failed to assign certificate:', err);
                // setError(err.message); // Uncomment or modify this line if you maintain error state
            });
        });
        
    };

  return (
    <form onSubmit={issueStudentCertificate} className="mt-4">
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-3xl semi-bold text-gray-900 mb-4">Certificate Issuance</h1>
            
            <div className="mb-4">
                <label 
                    htmlFor="certificate-dropdown" 
                    className="block text-lg font-medium text-gray-700 mb-2"
                >
                    Select Certificate Image:
                </label>
                <select
                    id="certificate-dropdown"
                    value={selectedImage}
                    onChange={handleSelectTemplageChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                >
                    <option value="">Select an image</option>
                    {certificates.map(certificate => (
                        <option key={certificate.id} value={certificate.image_url}>
                            {certificate.id} - {certificate.image_url}
                        </option>
                    ))}
                </select>
            </div>

            <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
                <div className="mb-4">
                    <label 
                        htmlFor="student-dropdown" 
                        className="block text-lg font-medium text-gray-700 mb-2"
                    >
                        Student:
                    </label>
                    <select
                        id="student-dropdown"
                        value={selectedStudent}
                        onChange={handleSelectedStudentChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        <option value="">Select a student</option>
                        {students.map(student => (
                            <option key={student.id} value={student.id}>
                                {student.id} - {student.first_name} {student.last_name}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedStudent && (
                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Selected Student</h2>
                        <p className="text-lg text-gray-700">Student ID: {selectedStudent}</p>
                    </div>
                )}
            </div>
            
            <div>
                        <label className="block text-sm font-medium text-gray-700">Select Course</label>
                        <select
                             id="courseId"
                             value={selectedCourse}
                             onChange={(e) => { 
                                 const fullValue = e.target.value;
                                 console.log('fullValue:', fullValue); // Debugging output
                                 const [courseId, courseName] = fullValue.split('-').map(str => str.trim());
                                 console.log('courseId:', courseId); // Debugging output
                                 console.log('courseName:', courseName); // Debugging output
                                 setCourseId(courseId);
                                 setCourseName(courseName);
                             }}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        >
                            <option value="">Select a Course</option>
                            {courses.map(course => (
                                <option key={course.id} value={`${course.id}-${course.course_name}`}>{course.id} - {course.course_name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Website</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={institutionUrl}
                            onChange={e => setInstitutionUrl(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Total Hours</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={totalHours}
                            onChange={e => setTotalHours(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date of Completion</label>
                        <input
                            type="date"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={dateCompletion}
                            onChange={e => setDateCompletion(e.target.value)}
                            required
                        />
                    
                    </div>

                    {selectedImage && (
                        <div className="mt-6">
                            <img 
                                src={selectedImage} 
                                alt="Selected Certificate" 
                                className="max-w-full h-auto"
                            />
                        </div>
                    )}
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">Assign Certificate</button>
            
            
        
        </div>
         </form>       
  );
};

export default CertificateIssuance;
