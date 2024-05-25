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
const db = require('./db')
const bcrypt = require('bcrypt')
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

app.get('/test-db-connect', async (req, res) => {
    try {
        const isConnected = db.testConnection();
        res.json({connected: isConnected})
    }
    catch(error) {
        console.error('Error signing in user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    //pool = db.getPoolConnection()
    //console.log(pool)
    db.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        // Use the connection to execute a query
        connection.query(`SELECT * FROM users where email = '${email}'`, (err, results) => {
            // Release the connection back to the pool
            connection.release();
    
            if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: `Internal server error ${err}` });
            }
    
            // Return the query results
            //console.log(results[0].password);
            bcrypt.compare(password, results[0].password, (err, passwordMatch) => {
                if(err) {
                    return res.status(500).json({ error: `Authentication failed ${err}` });
                }
                if(!passwordMatch) {
                    return res.status(401).json({ error: 'Invalid email or password' });
                }
                // Exclude password field and include only desired fields
                const { id, email, remember_token, status } = results[0];
                const user = { id, email, remember_token, status };
                return res.json(user);
            })
        });
    })
});

// Redirect root to dashboard
app.get('/', (req, res) => res.redirect('/dashboard'));

app.get('/users', async (req, res) => {
    try {
      const users = await db.executeQuery('SELECT * FROM users');
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

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
    const { email, issuer, badgeClass, assertion } = req.body;

    // Since email hash might be required dynamically, we adjust the 'identity' field
    if (assertion.recipient.hashed) {
        assertion.recipient.identity = "sha256$" + require('crypto').createHash('sha256').update(email + assertion.recipient.salt).digest('hex');
    }

    // Optionally adjust 'issuedOn' date if you need to set it server-side
    assertion.issuedOn = new Date().toISOString();

    // Your logic here to handle the issuer, badgeClass, and assertion data
    // For example, save to a database, create files, etc.

    res.json({
        message: "Badge created successfully!",
        issuer,
        badgeClass,
        assertion
    });
});
