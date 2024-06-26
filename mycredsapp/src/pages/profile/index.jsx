import React, { useState, useEffect } from 'react';

export default function Profile() {
    const [profile, setProfile] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
      // Assume user.id is stored in sessionStorage for demonstration
      const user = JSON.parse(sessionStorage.getItem('user'));

      if (user && user.id) {
            fetch(`http://localhost:5173/user-profile/${user.id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch profile');
                    }
                    return response.json();
                })
                .then(data => {
                    setProfile(data[0]); // Assuming the endpoint returns an array with one object
                })
                .catch(err => {
                    console.error('Error:', err);
                    setError(err.message);
                });
        }
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            {error && <p className="text-red-500">{error}</p>}
            {profile ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile.first_name} {profile.last_name}</dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Mobile Number</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile.mobile_no}</dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Email</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile.email}</dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Profile Picture</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <img src={profile.user_photo} alt="Profile" className="h-20 w-20 rounded-full"/>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
}
