import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import BadgesModal from './BadgesModal';
import CertificationModal from './CertificationModal';

const Student = () => {
  const navigate = useNavigate();  
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // States for adding a new student
  const [selectedUserId, setSelectedUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [userPhoto, setUserPhoto] = useState(null);
  const [users, setUsers] = useState([]);
  //for modal window
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [badgeImages, setBadgeImages] = useState([]);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [selectedCertificationId, setSelectedCertificationId] = useState(null);
  const [certificateUserId, setCertificateUserId] = useState(null);

  const handleRowClick = (student) => {
    //navigate(`student_badge_certifications`);
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
      window.location.href = 'http://localhost:5173/auth';
    }
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/students')
      .then(response => response.json())
      .then(data => {
        setStudents(data);
        setFilteredStudents(data); // Initialize filteredStudents with all students
      })
      .catch(err => console.error('Failed to fetch students:', err));
  }, []);

  /*
  * Get all users
  */
  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(users => {
        setUsers(users);
        //setFilteredStudents(data); // Initialize filteredStudents with all students
      })
      .catch(err => console.error('Failed to fetch students:', err));
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredStudents(students); // Show all students if search term is empty
    } else {
      const results = students.filter(student =>
        `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(results);
    }
  }, [searchTerm, students]);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('user_id', selectedUserId);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('mobile_no', mobileNo);
    formData.append('user_photo', userPhoto);
    //console.log(`add student`, formData);

    try {
      const response = await fetch('http://localhost:3000/students/create', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      alert('Student added successfully!');
      setStudents([...students, result]);
      setSearchTerm(''); // Reset search term to refresh the list
    } catch (error) {
      console.error('Failed to add student:', error);
      alert('Failed to add student: ' + error.message);
    }
  };

  const handleBadgeClick = (userId) => {
    const url = `http://localhost:3000/studentbadges?userId=${userId}`;
  
    fetch(url)
    .then(response => response.json())
    .then(data => {
      const images = data.map(item => item.badgeimageurl).filter(url => url); // Filter out empty URLs
      setBadgeImages(images);
      setIsModalOpen(true); // Open the modal
    })
    .catch(error => {
      console.error('Error fetching badge details:', error);
      // Handle errors here
    });
  };

  const handleAssignedCertificateClick = (userId) => {
    setCertificateUserId(userId);
    const url = `http://localhost:3000/assign-certificate/${userId}`; // Use userId in the URL

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Assignment certificates:', data); // Display the result in the console
            
            // Assuming the response is an array of certificates and you want to show the first one
            if (data.length > 0) {
              setSelectedCertificationId(data[0].id); // Set the ID of the first certificate
              setIsCertificateModalOpen(true); // Open the modal
            } else {
                console.log('No certificates found for this user.');
            }
            
        })
        .catch(error => {
            console.error('Error fetching assignment certificates:', error);
            // Handle errors here, maybe show an error message to the user
        });
};


  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col mb-4">
        <h3 className="text-lg font-semibold">Create Student Profile</h3>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <select
              className="p-2 border rounded-md"
              value={selectedUserId}
              onChange={e => setSelectedUserId(e.target.value)}
              required>
              <option value="">Select a User</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.id}-{user.email}</option>
              ))}
            </select>
            <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="p-2 border rounded-md" required />
            <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} className="p-2 border rounded-md" required />
            <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} className="p-2 border rounded-md" required />
            <input type="text" placeholder="Mobile No" value={mobileNo} onChange={e => setMobileNo(e.target.value)} className="p-2 border rounded-md" required />
            <input type="file" onChange={e => setUserPhoto(e.target.files[0])} className="p-2 border rounded-md" />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">Add Student</button>
        </form>
      </div>
      <h2 className="text-2xl font-semibold leading-tight py-4">Students List</h2>
      <input
          type="text"
          placeholder="Search by student name..."
          className="mb-4 px-4 py-2 border rounded-md w-full"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
      />
      <Outlet />
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Badges</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificates</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredStudents.map((student) => (
            <tr key={student.id} className="cursor-pointer">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {student.first_name} {student.last_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {student.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <img src={student.user_photo} alt="Profile" className="h-10 w-10 rounded-full" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <button 
          onClick={() => handleBadgeClick(student.id)}
          className="text-blue-500 underline hover:text-blue-700"
        >
          {student.no_of_badges}
        </button>
      </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button 
                  onClick={() => handleAssignedCertificateClick(student.id)} // Use student.id for assignments
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  {student.no_of_certificates} {/* Display the number of certificates */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {/* Your existing UI code */}

        {/* Modal for Certification Details */}
        {isCertificateModalOpen && (
            <CertificationModal
                certificationId={selectedCertificationId}
                userId={certificateUserId} // Pass the userId to the modal
                onClose={() => setIsCertificateModalOpen(false)} // Close modal function
            />
        )}
    </div>
      <BadgesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        badgeImages={badgeImages}
      />
      <div className="py-2">
        <div className="flex justify-center">
          <nav>
            <ul className="inline-flex -space-x-px">
              {Array.from({ length: Math.ceil(filteredStudents.length / studentsPerPage) }, (_, i) => (
                <li key={i + 1}>
                  <button
                    onClick={() => paginate(i + 1)}
                    className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-md hover:bg-gray-100 hover:text-gray-700"
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Student;
