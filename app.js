/*
* This server side for MyCreds360 is for certifications based on the following starndards
a. Adhering to the W3C v2 standard
b. Adhering to the OpenBadges 3.0 standard - Metadata enhancement
c. Adhering to the Comprehensive Learner Record Standard
d. Adhering to the Educational Verifiable Credentials Model 
e. Establishing a Certification Numbering standard
f. GDPR / CCPA compliance

Cross-chain Functionality
a. Mettl API integration - High Priority
b. Participant / Student Wallet to hold these NFT/Certs - Wallet Selection and Integration
c. User Access and Account Security / Auth0 ?
d. Analytics
*/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes here
// Enable CORS for all routes
app.use(cors());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Redirect root to dashboard
app.get('/', (req, res) => res.redirect('/dashboard'));

// Admin routes for images
app.get('/admin/image_url/:id', (req, res) => {
    // Placeholder for your actual handler
    res.send('Image URL for ' + req.params.id);
});

// Institution Routes
app.get('/institution/index', (req, res) => {
    // Placeholder for actual institution index
    res.send('List of Institutions');
});
app.get('/institution/create', (req, res) => {
    // Form for creating an institution
    res.send('Institution Create Form');
});
app.post('/institution/store', (req, res) => {
    // Store an institution
    res.send('Institution Stored');
});
app.get('/institution/edit/:id', (req, res) => {
    // Edit form for institution
    res.send('Edit Institution with ID ' + req.params.id);
});
app.put('/institution/update/:id', (req, res) => {
    // Update an institution
    res.send('Institution Updated with ID ' + req.params.id);
});

// Using app.get and app.post directly
app.get('/newcourses', (req, res) => {
    res.send('Listing new courses');
});
app.get('/newcourses/create', (req, res) => {
    res.send('Form to create a new course');
});
app.post('/newcourses/store', (req, res) => {
    res.send('Store new course');
});

// This route will generate the badge to be issued to the student
app.post('/createBadge', async (req, res) => {
    const { email } = req.body; // Assuming the email is passed in the request body

    const issuer = {
        "id": "https://example.com/issuer/issuer-profile",
        "type": "Issuer",
        "name": "Example University",
        "url": "https://example.com",
        "email": "contact@example.com"
    };

    const badgeClass = {
        "id": "https://example.com/badgeclass/123",
        "type": "BadgeClass",
        "name": "Certified PHP Developer",
        "description": "Awarded to individuals who have demonstrated excellence in PHP development.",
        "image": "https://example.com/badges/image.png",
        "criteria": { "narrative": "Successfully pass the PHP Developer Examination." },
        "issuer": "https://example.com/issuer/issuer-profile"
    };

    const assertion = {
        "id": "https://example.com/assertion/456",
        "type": "Assertion",
        "recipient": {
            "type": "email",
            "hashed": true,
            "salt": "deadsea",
            "identity": "sha256$" + require('crypto').createHash('sha256').update(email + 'deadsea').digest('hex')
        },
        "image": "https://example.com/badges/assertion-image.png",
        "evidence": "https://example.com/badges/evidence/456",
        "issuedOn": new Date().toISOString(),
        "badge": "https://example.com/badgeclass/123"
    };

    // Save JSON data to files in local storage
    try {
        await fs.outputJson(path.join(__dirname, 'storage', 'issuer.json'), issuer, { spaces: 2 });
        await fs.outputJson(path.join(__dirname, 'storage', 'badgeClass.json'), badgeClass, { spaces: 2 });
        await fs.outputJson(path.join(__dirname, 'storage', 'assertion.json'), assertion, { spaces: 2 });

        res.json({ message: 'Badge created successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create badge' });
    }
});

