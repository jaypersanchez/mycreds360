import { useState, useEffect } from 'react';

const BadgeDropDown = ({ courses, onSelect }) => {
    const [selectedCourse, setSelectedCourse] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedCourse(value);
        onSelect(value);
    };

    return (
        <div className="mb-4">
            <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">Course Name</label>
            <div className="relative">
                <select
                    id="courseId"
                    value={selectedCourse}
                    onChange={handleChange}
                    className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm"
                    required
                >
                    <option value="">Select a course</option>
                    {courses
                        .sort((a, b) => a.course_name.localeCompare(b.course_name)) // Sort by course_name
                        .map(course => (
                            <option key={course.id} value={`${course.id} | ${course.course_name}`}>
                                {course.id} - {course.course_name}
                            </option>
                        ))
                    }
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                    {/* Custom dropdown styling */}
                </div>
            </div>
        </div>
    );
};

export default BadgeDropDown;
