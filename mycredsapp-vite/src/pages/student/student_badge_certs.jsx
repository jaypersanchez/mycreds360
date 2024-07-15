import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';


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
            .then(data => setCourses(data))
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
    
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

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
            })
        ]).then(([institutionName, courseName]) => {
            const payload = {
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
            fetch(`http://localhost:3000/assign-certificate/${user.id}`, {
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
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold mb-4">Student Badge and Certification Assignment</h1>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-lg font-semibold">Student ID: {user.id}</h2>
                    <p className="text-gray-600">Name: {userData.fullName}</p>
                    <p className="text-gray-600">Email: {user.email}</p>
                </div>
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
                        <label className="block text-sm font-medium text-gray-700">Select Institution</label>
                        <select
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={selectedInstitution}
                            onChange={e => { 
                                console.log('Inst Select value:', e.target.value);
                                setSelectedInstitution(e.target.value)
                            }}
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
            </form>
        </div>
                        <div className="mt-4">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Institution Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Course Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total Hours
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date of Completion
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {certifications.map((certification, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <a href={`http://localhost:3000/assign-certificate/${user.id}/${certification.id}`} target="_blank" rel="noopener noreferrer">
                                                    {certification.institution_name}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {certification.course_name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {certification.total_hours}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {certification.date_completion}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}  

export default StudentBadgeCerts;