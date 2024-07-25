import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import CertificationModal from './CertificationModal.jsx';


function StudentBadgeCerts() {
    const navigate = useNavigate(); // Hook for navigation
    const [userId, setUserId] = useState(); // If you need to fetch additional data based on URL parameter
    const [activeTab, setActiveTab] = useState('badge');
    const [userData, setUserData] = useState({ fullName: '', email: '' });
    const [certifications, setCertifications] = useState([]);
    const [error, setError] = useState('');

    //certifications
    const [institutions, setInstitutions] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedInstitution, setSelectedInstitution] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [institutionUrl, setInstitutionUrl] = useState('');
    const [totalHours, setTotalHours] = useState('');
    const [dateCompletion, setDateCompletion] = useState('');
    // Local state to hold the selected institution and course details
    const [selectedInstitutionDetails, setSelectedInstitutionDetails] = useState({});
    const [selectedCourseDetails, setSelectedCourseDetails] = useState({});
    const [institutionName, setInstitutionName] = useState('');
    const [courseName, setCourseName] = useState('');   
    // State for modal
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCertification, setSelectedCertification] = useState(null);
    const [selectedCertTemp, setSelectedCertTemp] = useState('');
    const [certificates, setCertificates] = useState([]);
    const [selectedImage, setSelectedImage] = useState('');
    const [fields, setFields] = useState([]);
    //need state saved for selected student
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedStudentName, setSelectedStudentName] = useState('');
    const [showStudentName, setShowStudentName] = useState(false);

    // Assume user data is stored as a JSON string
    const user = JSON.parse(sessionStorage.getItem('user')) || {};

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

    /*
    * User must first be authenticated before they can access the course page
    */
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        
        setUserId(user.id);
        // I need to direct the user back to http://localhost:3000/login if they are not logged in
        if (!user) {
          window.location.href = 'http://localhost:5173/auth';
        }
        // Assuming the user object includes the user's first name and last name  
        //setUser(user);
        //setUserId(user.id);
        //setFirstName(user.first_name);
        //setLastName(user.last_name);
      }, []);
      
    // Fetch institutions
    useEffect(() => {
        fetch('http://localhost:3000/institution/index')
            .then(response => response.json())
            .then(data => setInstitutions(data))
            .catch(err => console.error('Error fetching institutions:', err));
    }, []);

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

    // this will fetch the certifications and badges that the student has
    useEffect(() => {
        if (user && user.id) {
            fetch(`http://localhost:3000/assign-certificate/${user.id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('1 Failed to fetch certification details');
                    }
                    return response.json();
                })
                .then(data => {
                    setCertifications(data);
                })
                .catch(err => {
                    console.error('Error fetching certification details:', err);
                    setError(err.message);
                });
        }
    }, []);

    useEffect(() => {
        if (user && user.id) {
            fetch(`http://localhost:3000/user-profile/${user.id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('2 Failed to fetch user profile');
                    }
                    return response.json();
                })
                .then(data => {
                    setUserData({
                        fullName: `${data[0].first_name} ${data[0].last_name}`,
                        email: data.email
                    });
                })
                .catch(err => {
                    console.error('Error fetching user profile:', err);
                    setError(err.message);
                });
        }
    }, []);

    // useeffect to get all students from endpoint http://localhost:3000/students
    useEffect(() => {
        fetch('http://localhost:3000/students')
            .then(response => response.json())
            .then(data => {
                //console.log('Students:', data);
                setStudents(data);
            })
            .catch(err => console.error('Error fetching students:', err));
    }, []);
    
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    /*
    * This function will handle the submission of the form to assign a certificate to a student
    * This requires both student id, which is user.id and the certificate id
    */
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Get institution and course names asynchronously and then construct payload
        Promise.all([
            // Promise to get institution name
            new Promise((resolve) => {
                const institution = institutions.find(inst => inst.id === institutions[selectedInstitution].institution_name);
                console.log('Found Institution:', institutions[selectedInstitution].institution_name);
                setInstitutionName(institutions[selectedInstitution].institution_name)
                resolve(institutionName);
            }),
            // Promise to get course name
            new Promise((resolve) => {
                
                console.log('Selected Course ID:', selectedCourse);
                const course = courses.find(c => c.id.toString() === selectedCourse);
                if (course) {
                    console.log('Found Course:', course);
                    setCourseName(course.course_name);
                    resolve(course.course_name);
                } else {
                    console.log('No course found for ID:', selectedCourse);
                    resolve(''); // resolve with an empty string or appropriate default value
                }
                //resolve(course ? course : '');
            }),
            new Promise((resolve) => {
                console.log('Selected Student:', selectedStudent);
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
            console.log('Payload:', payload);

            // Call your API to assign a certificate
            //fetch(`http://localhost:3000/assign-certificate/${selectedStudent}/${selectedCertTemp}`, {
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
    
    const handleModalOpen = (certification) => {
        setSelectedCertification(certification);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedCertification(null);
        setModalOpen(false);
    };

    /*
    * This will fetch the certificates from the server and set the state for the drop down list
    */
    useEffect(() => {
        // Fetch the certificates from the server when the component mounts
        const fetchCertificates = async () => {
            try {
                const response = await fetch('http://localhost:3000/certificate');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCertificates(data);
            } catch (error) {
                console.error('Error fetching certificates:', error);
            }
        };

        fetchCertificates();
    }, []);

    /* 
    * This function selects the image certificate based on the selected template list.
    * This has the json values for the field placements.
    */
    const handleSelectChange = async (e) => {
        const selectedId = e.target.value;
        console.log('Selected ID:', selectedId);
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

    const handleStudentChange = (e) => {
        const studentId = e.target.value;
        console.log('Selected Student ID:', studentId);

        // Ensure the studentId is correctly compared to student.id
        const student = students.find(student => student.id.toString() === studentId);
        
        if (student) {
            console.log('Selected Student:', student.first_name, student.last_name);
            setSelectedStudentName(`${student.first_name} ${student.last_name}`);
        } else {
            console.log('Student not found');
            setSelectedStudentName('');
        }

        setSelectedStudent(studentId);
    };

    // function to handleInstitutionChange
    const handleInstitutionChange = (e) => {
        const institutionId = e.target.value;
        console.log('Selected Institution ID:', institutionId);
        setSelectedInstitution(institutionId);
        // I need the institution name to display on the certificate
        const institution = institutions.find(inst => inst.id.toString() === institutionId);
        if (institution) {
            console.log('Selected Institution:', institution.institution_name);
            setInstitutionName(institution.institution_name);
        } else {
            console.log('Institution not found');
            setInstitutionName('');
        }
    };


    const handleViewTemplate = () => {
        // Trigger the rendering of the student text on the image
        if (selectedStudent && selectedImage) {
            console.log(`handleViewTemplate: ${selectedStudent}`);
            // Update the state to show the student's name on the image
            setShowStudentName(true); // You can manage this state if needed
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold mb-4">Student Badge and Certification Issuance</h1>
                
            </div>
            <div className="border-b border-gray-200">
                <ul className="flex flex-wrap -mb-px">
                    <li className="mr-2">
                        <button onClick={() => handleTabClick('badge')}
                            className={`inline-block p-4 rounded-t-lg border-b-2 ${activeTab === 'badge' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}>
                            Badge
                        </button>
                    </li>
                    <li className="mr-2">
                        <button onClick={() => handleTabClick('certifications')}
                            className={`inline-block p-4 rounded-t-lg border-b-2 ${activeTab === 'certifications' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}>
                            Certifications
                        </button>
                    </li>
                </ul>
            </div>
            <div className="p-4">
                {activeTab === 'badge' ? (
                    <div>
                        <h3 className="text-lg font-semibold">Badge Details</h3>
                        {/* Content for Badge */}
                    </div>
                ) : (
                    <div>
                        {/* Certificate Details */}
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold">Certification Details</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                <label className="block text-sm font-medium text-gray-700">Select Template</label>
                <select
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={selectedCertTemp}
                onChange={handleSelectChange}
                required
            >
                <option value="">Select Template</option>
                {certificates.map(cert => (
                    <option key={cert.id} value={cert.id}>
                       {cert.id}:{cert.institution_id} - {cert.image_url}
                    </option>
                ))}
                    </select>

                    {selectedImage && selectedStudent && selectedInstitution && selectedCourse && institutionUrl && totalHours && dateCompletion && (
                        <div className="relative mt-4">
                            <img 
                                src={selectedImage} 
                                alt="Selected Certificate" 
                                className="max-w-full h-auto"
                            />
                            
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '10px', // Adjust as needed
                                        left: '10px', // Adjust as needed
                                        color: 'black', // Customize text color if needed
                                        fontSize: '24px', // Customize text size if needed
                                        whiteSpace: 'nowrap',
                                        fontWeight: 'bold',
                                        backgroundColor: 'rgba(255, 255, 255, 0.6)', // Optional: Semi-transparent background for readability
                                        padding: '5px', // Optional: Padding for better text visibility
                                        borderRadius: '5px' // Optional: Rounded corners for the background
                                    }}
                                >
                                    { selectedStudentName }
                                </div>
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '50px', // Adjust as needed
                                        left: '10px', // Adjust as needed
                                        color: 'black',
                                        fontSize: '16px',
                                        whiteSpace: 'nowrap',
                                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                        padding: '5px',
                                        borderRadius: '5px'
                                    }}
                                >
                                {institutionName}
                                </div>
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '90px', // Adjust as needed
                                        left: '10px', // Adjust as needed
                                        color: 'black',
                                        fontSize: '16px',
                                        whiteSpace: 'nowrap',
                                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                        padding: '5px',
                                        borderRadius: '5px'
                                    }}
                                >
                                {selectedCourse}
                                </div>
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '130px', // Adjust as needed
                                        left: '10px', // Adjust as needed
                                        color: 'black',
                                        fontSize: '16px',
                                        whiteSpace: 'nowrap',
                                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                        padding: '5px',
                                        borderRadius: '5px'
                                    }}
                                >
                                    Website: {institutionUrl}
                                </div>
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '170px', // Adjust as needed
                                        left: '10px', // Adjust as needed
                                        color: 'black',
                                        fontSize: '16px',
                                        whiteSpace: 'nowrap',
                                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                        padding: '5px',
                                        borderRadius: '5px'
                                    }}
                                >
                                    Total Hours: {totalHours}
                                </div>
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '210px', // Adjust as needed
                                        left: '10px', // Adjust as needed
                                        color: 'black',
                                        fontSize: '16px',
                                        whiteSpace: 'nowrap',
                                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                        padding: '5px',
                                        borderRadius: '5px'
                                    }}
                                >
                                    Date of Completion: {dateCompletion}
                                </div>
                        </div>
                    )}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Select Student</label>
                        <select
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={selectedStudent}
                            onChange={handleStudentChange}
                            required
                        >
                            <option value="">Select a Student</option>
                            {students.map(student => (
                                <option key={student.id} value={student.id}>{student.first_name} {student.last_name}</option>
                            ))}
                        </select>   
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Select Institution</label>
                        <select
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={selectedInstitution}
                            onChange={handleInstitutionChange}
                            required
                        >
                            <option value="">Select an Institution</option>
                            {institutions.map(inst => (
                                <option key={inst.id} value={inst.id}>{inst.institution_name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Select Course</label>
                        <select
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={selectedCourse}
                            onChange={e => setSelectedCourse(e.target.value)}
                            required
                        >
                            <option value="">Select a Course</option>
                            {courses.map(course => (
                                <option key={course.id} value={course.id}>{course.course_name}</option>
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
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">Assign Certificate</button>
                <button 
                    type="button" 
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
                    onClick={handleViewTemplate}
                >
                    View Template
                </button>
            </form>
        </div>
                        
            {/* Modal Component should display*/}
            {selectedCertification && (
                <CertificationModal
                    certificationId={selectedCertification.id} // Pass the certification ID
                    userId={userId} // Pass the user ID
                    onClose={handleModalClose}
                />
            )}
                    </div>
                )}
            </div>
        </div>
    );
}  

export default StudentBadgeCerts;