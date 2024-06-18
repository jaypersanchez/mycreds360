import React, { useState, useEffect } from 'react';

export default function Course() {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [coursesPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/newcourses')
            .then(response => response.json())
            .then(data => {
                setCourses(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch courses:', err);
                setError('Failed to fetch courses');
                setLoading(false);
            });
    }, []);

    // Calculate current courses for pagination
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold leading-tight">Courses</h2>
            <div className="mt-4">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Course Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentCourses.map(course => (
                            <tr key={course.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.course_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.course_description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="py-2">
                <nav className="block">
                    <ul className="flex pl-0 rounded list-none flex-wrap justify-center">
                        {Array.from({ length: Math.ceil(courses.length / coursesPerPage) }, (_, i) => (
                            <li key={i + 1} className="px-4">
                                <button onClick={() => paginate(i + 1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}
