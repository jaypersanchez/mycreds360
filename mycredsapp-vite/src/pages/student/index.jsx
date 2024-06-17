
import React, { useState, useEffect } from 'react';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);

  useEffect(() => {
    fetch('http://localhost:3000/students')
      .then(response => response.json())
      .then(data => { 
        console.log(`Fetched ${JSON.stringify(data)} students`)
        setStudents(data)
      })
      .catch(err => console.error('Failed to fetch students:', err));
  }, []);

  // Get current students
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold leading-tight py-4">Students List</h2>
      <ul className="divide-y divide-gray-200">
        {currentStudents.map(student => (
          <li key={student.id} className="py-4">
            {student.first_name}
          </li>
        ))}
      </ul>
      <div className="py-2">
        <div className="flex justify-center">
          <nav>
            <ul className="inline-flex -space-x-px">
              {Array.from({ length: Math.ceil(students.length / studentsPerPage) }, (_, i) => (
                <li key={i + 1}>
                  <a
                    href="#!"
                    onClick={() => paginate(i + 1)}
                    className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-md hover:bg-gray-100 hover:text-gray-700"
                  >
                    {i + 1}
                  </a>
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

