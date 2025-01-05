import React, { useState } from 'react';

const CertificationIssuance = ({
  students,
  courses,
  institutions,
  onSubmitCertification,
}) => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [totalHours, setTotalHours] = useState('');
  const [completionDate, setCompletionDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitCertification({
      selectedStudent,
      selectedCourse,
      selectedInstitution,
      totalHours,
      completionDate,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Issue Certification</h3>
      <div>
        <label>Student</label>
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          required
        >
          <option value="">Select Student</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.first_name} {student.last_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Institution</label>
        <select
          value={selectedInstitution}
          onChange={(e) => setSelectedInstitution(e.target.value)}
          required
        >
          <option value="">Select Institution</option>
          {institutions.map((inst) => (
            <option key={inst.id} value={inst.id}>
              {inst.institution_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Course</label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          required
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.course_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Total Hours</label>
        <input
          type="number"
          value={totalHours}
          onChange={(e) => setTotalHours(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Completion Date</label>
        <input
          type="date"
          value={completionDate}
          onChange={(e) => setCompletionDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Issue Certification</button>
    </form>
  );
};

export default CertificationIssuance;
