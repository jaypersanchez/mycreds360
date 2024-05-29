const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function testEndpoint() {
    const institutionName = 'Code Academy1';
    const imagePath = 'code_academy.png'; // Replace this with the path to your image file

    // Create form data
    const formData = new FormData();
    formData.append('institution_name', institutionName);
    formData.append('logo', fs.createReadStream(imagePath));

    // Make POST request
    try {
        const response = await axios.get('http://localhost:3000/institution/create', formData, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testEndpoint();
