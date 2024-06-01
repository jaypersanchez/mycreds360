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
const multer = require('multer')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Define routes here
// Enable CORS for all routes
app.use(cors());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Multer configuration for file uploads
const upload = multer({ dest: 'uploads/' });

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
    db.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        // Use the connection to execute a query
        connection.query(`SELECT * FROM users`, (err, results) => {
            // Release the connection back to the pool
            connection.release();
    
            if (err) { 
                console.error('Error executing query:', err);
                return res.status(500).json({ error: `Internal server error ${err}` });
            }
            
            return res.json(results);
        });
    })
  });

// Admin routes for images
app.get('/admin/image_url/:id', (req, res) => {
    // Placeholder for your actual handler
    res.send('Image URL for ' + req.params.id);
});

// Institution Routes
app.get('/institution/index', (req, res) => {
    // Placeholder for actual institution index
    db.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        // Use the connection to execute a query
        connection.query(`SELECT * FROM institution`, (err, results) => {
            // Release the connection back to the pool
            connection.release();
    
            if (err) { 
                console.error('Error executing query:', err);
                return res.status(500).json({ error: `Internal server error ${err}` });
            }
            
            return res.json(results);
        });
    })
});

/*
*   Need to add capability to save institution's logo image
*   and a signature image   
*/
app.post('/institution/create', (req, res) => {
    
    const { institution_name } = req.body;
    const logo = req.file ? req.file.path : null; // Assuming req.file contains the uploaded file information
    console.log(`New Instituion ${institution_name}`)
    if (!institution_name) {
        return res.status(400).json({ error: 'Institution name is required' });
    }
    db.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Use the connection to execute a query
        connection.query('INSERT INTO institution (institution_name, logo) VALUES (?, ?)', [institution_name, logo], (err, results) => {
            // Release the connection back to the pool
            connection.release();
    
            if (err) { 
                console.error('Error executing query:', err);
                return res.status(500).json({ error: `Internal server error ${err}` });
            }
            
            return res.status(201).json({ message: 'Institution created successfully', institution_id: results.insertId });
        });
    });
});

/*app.post('/institution/store', (req, res) => {
    // Store an institution
    res.send('Institution Stored');
});*/

app.get('/institution/search/:name', (req, res) => {
    const partialName = `%${req.params.name}%`; // Wrap the search term with '%' to match partial names

    // Get a connection from the pool
    db.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Execute SQL query to search for institutions by partial name
        connection.query(
            'SELECT * FROM institution WHERE institution_name LIKE ?',
            [partialName],
            (err, results) => {
                // Release the connection back to the pool
                connection.release();

                if (err) {
                    console.error('Error executing query:', err);
                    return res.status(500).json({ error: `Internal server error ${err}` });
                }

                // Return the search results
                return res.status(200).json(results);
            }
        );
    });
});


//get institution by ID
app.get('/institution/edit/:id', (req, res) => {
    const institutionId = req.params.id;

    // Get a connection from the pool
    db.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Execute SQL query to fetch institution record by ID
        connection.query(
            'SELECT * FROM institution WHERE id = ?',
            [institutionId],
            (err, results) => {
                // Release the connection back to the pool
                connection.release();

                if (err) {
                    console.error('Error executing query:', err);
                    return res.status(500).json({ error: `Internal server error ${err}` });
                }

                // Check if institution record exists
                if (results.length === 0) {
                    return res.status(404).json({ error: 'Institution not found' });
                }

                // Return the institution record
                return res.status(200).json(results[0]);
            }
        );
    });
});

//update institution data by ID
app.put('/institution/update/:id', (req, res) => {
    const { institution_name, logo, signature } = req.body;
    const institutionId = req.params.id;

    // Check if institution name is provided
    if (!institution_name) {
        return res.status(400).json({ error: 'Institution name is required' });
    }

    // Get a connection from the pool
    db.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Execute SQL query to update institution record
        connection.query(
            'UPDATE institution SET institution_name = ?, logo = ?, signature = ? WHERE id = ?',
            [institution_name, logo, signature, institutionId],
            (err, results) => {
                // Release the connection back to the pool
                connection.release();

                if (err) {
                    console.error('Error executing query:', err);
                    return res.status(500).json({ error: `Internal server error ${err}` });
                }

                // Check if any rows were affected
                if (results.affectedRows === 0) {
                    return res.status(404).json({ error: 'Institution not found' });
                }

                // Return success message
                return res.status(200).json({ message: 'Institution updated successfully' });
            }
        );
    });
});

// Account endpoints
app.post('/account/new', (req, res) => {
    const { email, password, role_user } = req.body;
    // Hash the password
    //const hashedPassword = await bcrypt.hash(password, 10);
    let hashedPassword
    bcrypt.hash(password, 10, (err, _hashedPassword) => {
        
        hashedPassword = _hashedPassword
    

    
    if (!email || !role_user) {
        return res.status(400).json({ error: 'email and role is required' });
    }
    db.pool.getConnection((err, connection) => {
        // status default is 1 for active
        const createUserQuery = 'INSERT INTO users (email, password, status) VALUES (?, ?, ?)';
        
        connection.query(createUserQuery, [email, hashedPassword, 1], (err, results) => {
            // Release the connection back to the pool
            connection.release();
    
            if (err) { 
                console.error('Error executing query:', err);
                return res.status(500).json({ error: `Internal server error ${err}` });
            }
            console.log(results)
            // Step 2: Retrieve the automatically generated user_id
            const userId = results.insertId;
            // Step 3: Insert a record into the role_user table
            const createRoleUserQuery = 'INSERT INTO role_user (user_id, role_id) VALUES (?, ?)';
            connection.query(createRoleUserQuery, [userId, role_user], (err) => {
                if (err) {
                  console.error('Error assigning role to user:', err);
                  return res.status(500).json({ error: 'Failed to assign role to user' });
                }
                // User created successfully
                //res.status(201).json({ message: 'User created successfully' });
            });

            return res.status(201).json({ message: 'Account created successfully', userId });
        });
    })
    })
})

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
