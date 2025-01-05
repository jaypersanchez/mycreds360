import React, { useState, useEffect } from 'react';

const BadgeIssuance = ({
  students,
  courses,
  handleSubmitStudentBadge,
  error,
  success,
}) => {
  const [badgeselectedStudentId, setBadgeSelectedStudentId] = useState('');
  const [badgecourseId, setBadgeCourseId] = useState('');
  const [badgeCourseName, setBadgeCourseName] = useState('');
  const [dateCompletion, setDateCompletion] = useState('');

  // This useEffect can be used to handle side effects or reset form states if needed.
  useEffect(() => {
    // Example: Reset fields if needed
    // setBadgeSelectedStudentId('');
    // setBadgeCourseId('');
    // setBadgeCourseName('');
    // setDateCompletion('');
  }, [students, courses]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmitStudentBadge({
      studentId: badgeselectedStudentId,
      courseId: badgecourseId,
      courseName: badgeCourseName,
      dateCompletion,
    });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Badge Details</h3>
      <form onSubmit={handleFormSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
            Student
          </label>
          <select
            id="studentId"
            value={badgeselectedStudentId}
            onChange={(e) => {
              const [studentId] = e.target.value.split(' - ');
              setBadgeSelectedStudentId(studentId);
            }}
            className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="">Select a student</option>
            {students.map((student) => (
              <option key={student.id} value={`${student.id} - ${student.first_name} ${student.last_name}`}>
                {student.id} - {student.first_name} {student.last_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="courseId" className="block text-sm font-medium text-gray-700">
            Course Name
          </label>
          <select
            id="courseId"
            value={badgecourseId}
            onChange={(e) => {
              const [courseId, courseName] = e.target.value.split('-').map(str => str.trim());
              setBadgeCourseId(courseId);
              setBadgeCourseName(courseName);
            }}
            className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={`${course.id}-${course.course_name}`}>
                {course.id}-{course.course_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="dateCompletion" className="block text-sm font-medium text-gray-700">
            Date of Completion
          </label>
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
  );
};

export default BadgeIssuance;
