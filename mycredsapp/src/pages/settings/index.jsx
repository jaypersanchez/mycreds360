import React, { useState } from 'react';

export default function Settings() {
    const [siteName, setSiteName] = useState('');
    const [siteLogo, setSiteLogo] = useState(null);
    const [adminEmail, setAdminEmail] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(20);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('siteName', siteName);
        formData.append('siteLogo', siteLogo);
        formData.append('adminEmail', adminEmail);
        formData.append('entriesPerPage', entriesPerPage);

        try {
            const response = await fetch('http://localhost:5173/settings/update', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            console.log('Success:', result);
            alert('Settings updated successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to update settings.');
        }
    };

    const handleLogoChange = (event) => {
        setSiteLogo(event.target.files[0]);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-4">Site Settings</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">Site Name</label>
                    <input
                        type="text"
                        id="siteName"
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="siteLogo" className="block text-sm font-medium text-gray-700">Site Logo</label>
                    <input
                        type="file"
                        id="siteLogo"
                        onChange={handleLogoChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                        accept="image/*"
                    />
                </div>
                <div>
                    <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700">Admin Email</label>
                    <input
                        type="email"
                        id="adminEmail"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="entriesPerPage" className="block text-sm font-medium text-gray-700">Entries Per Page</label>
                    <input
                        type="number"
                        id="entriesPerPage"
                        value={entriesPerPage}
                        onChange={(e) => setEntriesPerPage(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        min="1"
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Update Settings</button>
            </form>
        </div>
    );
}
