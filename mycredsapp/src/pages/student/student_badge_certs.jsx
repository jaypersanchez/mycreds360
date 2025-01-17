import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import CertificationModal from './CertificationModal.jsx';
import BadgeIssuance from './BadgeIssuance.jsx';
import BadgeDropdown from './BadgeDropDown.jsx';
import CertificateCanvas from './CertificateCanvas';

function StudentBadgeCerts() {
    const navigate = useNavigate(); // Hook for navigation
    const [userId, setUserId] = useState(); // If you need to fetch additional data based on URL parameter
    const [activeTab, setActiveTab] = useState('badge');
    const [userData, setUserData] = useState({ fullName: '', email: '' });
    const [certifications, setCertifications] = useState([]);
    const [error, setError] = useState('');
    const [badges, setBadges] = useState([]);
    const [selectedBadgeUrl, setSelectedBadgeUrl] = useState('');

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
    const [success, setSuccess] = useState('');
    const [badgecourseId, setBadgeCourseId] = useState('');
    const [referenceId, setReferenceId] = useState('');
    const [jsonValues, setJsonValues] = useState('');
    const [nftValue, setNftValue] = useState('');
    const [badgeselectedStudentId, setBadgeSelectedStudentId] = useState('');
    const [badgeCourseName, setBadgeCourseName] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingCertificates, setLoadingCertificates] = useState(true); // New loading state for certificates

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
                //console.log(`Courses: ${data}`)
                setCourses(data)
    })
            .catch(err => console.error('Error fetching courses:', err));
    }, []);

    // this will fetch the certifications that the student has
    useEffect(() => {
        if (user && user.id) {
            setLoading(true);
            setLoadingCertificates(true); // Set loading state to true before fetching
            fetch(`http://localhost:3000/assign-certificate/${user.id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch certification details');
                    }
                    return response.json();
                })
                .then(data => {
                    setCertifications(data);
                    setLoading(false);
                    setLoadingCertificates(false); // Set loading state to false after fetching
                })
                .catch(err => {
                    console.error('Error fetching certification details:', err);
                    setError(err.message);
                    setLoading(false);
                    setLoadingCertificates(false); // Set loading state to false on error
                });
        }
    }, [user]);

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
                // Sort students by last name
                const sortedStudents = data.sort((a, b) => {
                    if (a.last_name < b.last_name) return -1;
                    if (a.last_name > b.last_name) return 1;
                    return 0;
                });
                //console.log(`Students: ${sortedStudents}`);
                    setStudents(data);
            })
            .catch(err => console.error('Error fetching students:', err));
    }, []);
    
    /*useEffect(() => {
        fetch(`http://localhost:3000/badge-images`)
          .then(response => response.json())
          .then(data => { 
            //console.log("Fetched badge images: ",data)
            setBadges(data)
          })
          .catch(error => setError('Error fetching badges: ' + error.message));
      }, []);*/

      useEffect(() => {
        fetch(`http://localhost:3000/badge-courses`)
          .then(response => response.json())
          .then(data => { 
            //console.log("Fetched badge images: ",data)
            setBadges(data)
          })
          .catch(error => setError('Error fetching badges: ' + error.message));
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
                //console.log('Certificate assigned:', JSON.stringify(data));
                setSuccess('Certificate successfully assigned.');
                setError(''); // Clear any previous error messages
            })
            .catch(err => {
                setSuccess(''); // Clear any previous success messages
                setError('Failed to assign certificate: ' + err.message);
                console.error('Failed to assign certificate:', err);
                // setError(err.message); // Uncomment or modify this line if you maintain error state
            });
        });
        
    };
    
    const handleSubmitStudentBadge = async (e) => {
        e.preventDefault();
        console.log(badgeselectedStudentId, badgecourseId, badgeCourseName, dateCompletion,selectedBadgeUrl);
        try {
            const response = await fetch('http://localhost:3000/create-student-badge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    student_id: badgeselectedStudentId, 
                    course_id: badgecourseId,
                    course_name: badgeCourseName,
                    date_completion: dateCompletion,
                    badgeImageUrl: selectedBadgeUrl
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Badge issued successfully!');
                setError('');
                // Clear form or reset states if needed
                setBadgeSelectedStudentId('');
                setBadgeCourseId('');
                setDateCompletion('');
            } else {
                setSuccess('');
                setError(data.error || 'Failed to issue badge');
            }
        } catch (error) {
            setSuccess('');
            setError('Failed to issue badge to student');
        }
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

    const handleStudentChange = (e) => {
        const studentId = e.target.value;
        //console.log('Selected Student ID:', studentId);

        // Ensure the studentId is correctly compared to student.id
        const student = students.find(student => student.id.toString() === studentId);
        
        if (student) {
            //console.log('Selected Student:', student.first_name, student.last_name);
            setSelectedStudentName(`${student.first_name} ${student.last_name}`);
        } else {
            //console.log('Student not found');
            setSelectedStudentName('');
        }

        setSelectedStudent(studentId);
    };

    // function to handleInstitutionChange
    const handleInstitutionChange = (e) => {
        const institutionId = e.target.value;
        //console.log('Selected Institution ID:', institutionId);
        setSelectedInstitution(institutionId);
        // I need the institution name to display on the certificate
        const institution = institutions.find(inst => inst.id.toString() === institutionId);
        if (institution) {
            //console.log('Selected Institution:', institution.institution_name);
            setInstitutionName(institution.institution_name);
        } else {
            //console.log('Institution not found');
            setInstitutionName('');
        }
    };

    // function to handlecoursechange
    const handleCourseChange = (e) => {
        const courseId = e.target.value;
        //console.log('Selected Course ID:', courseId);
        setSelectedCourse(courseId);
        // I need the course name to display on the certificate
        const course = courses.find(c => c.id.toString() === courseId);
        if (course) {
            //console.log('Selected Course:', course.course_name);
            setCourseName(course.course_name);
        } else {
            console.log('Course not found');
            setCourseName('');
        }
    };

    const handleViewTemplate = () => {
        // Trigger the rendering of the student text on the image
        if (selectedStudent && selectedImage) {
            //console.log(`handleViewTemplate: ${selectedStudent}`);
            // Update the state to show the student's name on the image
            setShowStudentName(true); // You can manage this state if needed
        }
    };

    const handleCourseSelect = (value) => {
        const [courseId, courseName] = value.split('|').map(str => str.trim());
        setBadgeCourseId(courseId);
        setBadgeCourseName(courseName);
    };

    const handleChange = (e) => { 
        const fullValue = e.target.value;
        console.log(fullValue, selectedBadgeUrl)
        const [courseId, courseName] = fullValue.split('|').map(str => str.trim());
        
        // Find the selected course from the list
        const selectedCourse = courses.find(course => course.id.toString() === courseId);
        
        if (selectedCourse) {
            setSelectedBadgeUrl(`http://localhost:3000${selectedCourse.badge}`);
            console.log(selectedBadgeUrl)
        } else {
            setSelectedBadgeUrl(''); // Clear the badge image if no course is selected
        }
        
        setBadgeCourseId(courseId);
        setBadgeCourseName(courseName);
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
                                    <form onSubmit={handleSubmitStudentBadge} className="mt-4">

                    <div className="mb-4">
                        <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">Student</label>
                        <select
                            id="studentId"
                            value={badgeselectedStudentId}  // Add state for selected student
                            onChange={(e) => {
                                const fullValue = e.target.value;
                                const [studentId] = fullValue.split(' - '); // Split the string and take the first part
                                setBadgeSelectedStudentId(studentId);
                            }}
                            className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm"
                            required
                        >
                            <option value="">Select a student</option>
                            {students
                                .sort((a, b) => a.last_name.localeCompare(b.last_name)) // Sort by last_name
                                .map(student => (
                                <option key={student.id} value={student.id}>
                                    {student.id} - {student.first_name} {student.last_name}
                                </option>
                                ))
                            }
                        </select>
                    </div>
                <div className="mb-4">
                    <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">Course Name</label>
                    <select
                        id="courseId"
                        value={`${badgecourseId} | ${badgeCourseName}`}
                        onChange={(e) => { 
                            const fullValue = e.target.value;
                            const [courseId, courseName] = fullValue.split('|').map(str => str.trim());
                            setBadgeCourseId(courseId);
                            setBadgeCourseName(courseName);
                            handleChange(e);
                        }}
                        className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm"
                        required
                    >
                        <option value="">Select a course</option>
                        {courses
                            .sort((a, b) => a.course_name.localeCompare(b.course_name)) // Sort by course_name
                            .map(course => (
                            <option key={course.id} value={`${course.id} | ${course.course_name}`}>
                                {course.id} - {course.course_name} - {`http://localhost:3000${course.badge}`}
                            </option>
                            ))
                        }
                    </select>
                </div>
                

                
                <div>
                    {/* Display the badge image below the select */}
            {selectedBadgeUrl && (
                <div className="mt-4">
                    <img src={selectedBadgeUrl} alt="Selected Badge" className="w-32 h-32 object-cover border rounded-md" />
                </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
            
        </div>
    


                <div className="mb-4">
                    <label htmlFor="dateCompletion" className="block text-sm font-medium text-gray-700">Date of Completion</label>
                    <input
                        type="date"
                        id="dateCompletion"
                        value={dateCompletion}
                        onChange={(e) => setDateCompletion(e.target.value)}
                        className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Issue Badge
                </button>

                {error && <p className="text-red-500 mt-4">{error}</p>}
                {success && <p className="text-green-500 mt-4">{success}</p>}
            </form>

                    </div>
                ) : (
                    
                    <div>
                        {/* Certificate Details */}
                        {loadingCertificates ? ( // Conditional rendering based on loading state
                            <p>Loading certificates...</p>
                        ) : (
                            <>
                                {certifications.length === 0 ? (
                                    <p>No certificates are available.</p>
                                ) : (
                                    <div>
                                        {/* Render certificates here */}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}  

export default StudentBadgeCerts;