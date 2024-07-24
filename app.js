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
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
const db = require('./db')
const bcrypt = require('bcrypt')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const jwt = require('jsonwebtoken');
const secretKey = '$2a$12$yuo3YIZPG611cmX6tgOoOuhSFobK6ZjNZeJqrXnEyhu47qD9APhva'
// Require Stripe library and initialize with your Stripe secret key
const stripe = require('stripe')('your_stripe_secret_key');
const ethers = require('ethers');
const mycredsABI = require('./nft_mycreds360/artifacts/contracts/MyCredsNFT.sol/MyCredsNFT.json').abi;
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
const crypto = require('crypto');


// Define routes here
// Enable CORS for all routes
app.use(cors());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Multer configuration for file uploads
//const upload = multer({ dest: 'uploads/' });
// Set up storage location and filenames
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/') // Make sure this folder exists
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname)
    }
  });
  
  const upload = multer({ storage: storage });
  // Middleware to parse multipart/form-data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(upload.single('logo')); 
app.use('/images', express.static('uploads'));


//helper function to get userprofiles based on user_id
const getUserProfile = (user_id) => {
    //console.log(`getUserProfile: ${user_id}`);
    const query = `SELECT * FROM userprofiles WHERE user_id = ?`;
    return new Promise((resolve, reject) => {
        db.pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting connection from pool:', err);
                reject(err);
                return;
            }
            connection.query(query, [user_id], (err, results) => {
                connection.release();
                if (err) {
                    console.error('Error executing query:', err);
                    reject(err);
                } else if (results.length > 0) {
                    console.log(`RESULTS: ${JSON.stringify(results[0])}`);
                    resolve(results[0]); // Resolve with the first result
                } else {
                    console.log("No results found");
                    resolve(null); // Resolve with null if no results found
                }
            });
        });
    });
}


// Endpoint to get a user profile by user ID
app.get('/user-profile/:userId', async (req, res) => {
    const userId = req.params.userId;
    //console.log(`user-profile ${userId}`)
        //const profile = await getUserProfile(userId);
        const query = `SELECT * FROM userprofiles WHERE user_id = ?`;
        db.pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting connection from pool:', err);
                reject(err);
                return;
            }
            connection.query(query, [userId], (err, results) => {
                connection.release();
                if (err) {
                    console.error('Error executing query:', err);
                    reject(err);
                } else if (results.length > 0) {
                    console.log(`/user-profile: ${JSON.stringify(results[0])}`);
                    return res.json(results);
                } else {
                    console.log("No results found");
                    return res.json("No results found"); // Resolve with null if no results found
                }
            });
        });
});

/* I need an endpoint where it will return all images that is in the uplodas folder 
* which is in the same loation as this app.js.  No parameter is required.
* This is for the Badges menu item not badges issued to a student.
*/
app.get('/badge-images', (req, res) => {
    const directoryPath = path.join(__dirname, 'uploads');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json(files);
    });
});

/*
*   This generates the JSON format of badge and certificate data and will mint as NFT
*/
app.post('/assign-certificate/:student_id', async (req, res) => {
    // need to add contract address
    const { student_id } = req.params;
    const { institution_id,course_id,institution_name, course_name, institution_url, total_hours, date_completion } = req.body;
    let fullName = '';
    
        // Fetch user profile
        console.log(`assign-certificate`,student_id,
                                        institution_name, 
                                        course_name, 
                                        institution_url, 
                                        total_hours, 
                                        date_completion )
        
               
        // Create JWT token for the badge
        const jwtToken = jwt.sign({
            student_id, institution_name, course_name, institution_url, total_hours, date_completion
        }, secretKey);

        // Build certificate badge object
        const certificate_badgev3 = {
            "@context": ["https://www.w3.org/2018/credentials/v1", "https://w3id.org/openbadges/v3"],
            "type": ["VerifiableCredential", "Assertion"],
            "id": "https://example.org/badges/123",
            "issuer": {
                "id": institution_id,
                "type": "Profile",
                "name": institution_name,
                "url": institution_url
            },
            "issuanceDate": date_completion,
            "credentialSubject": {
                "id": student_id,
                "type": "RecipientProfile",
                "name": fullName,
                "hasCredential": {
                    "type": "BadgeClass",
                    "name": course_name,
                    "image": "https://example.org/badges/images/12345.png",
                    "criteria": "https://example.org/badges/criteria/123",
                    "tags": ["Data Analysis", "Certification", "Professional"]
                }
            },
            "proof": {
                "type": "JwtProof " + new Date().toISOString(),
                "jwt": jwtToken
            }
        };

        // Serialize certificate badge object
        const badgeDataString = JSON.stringify(certificate_badgev3);
        //console.log(badgeDataString);
        // generation of token id to be hashed need to change to the actual format according to Bryant.
        const generatedtokenId = student_id + "-" + institution_id + "-" + course_id + "-" + Math.floor(Math.random() * 1000) + 1;
        //now hash this generated id to get the actual tokenid using sha256
        const hashedtokenId = crypto.createHash('sha256').update(generatedtokenId).digest('hex');
        // this tokenid is the token id used for NFT.
        const tokenId = BigInt('0x' + hashedtokenId)
        console.log(`hash tokenId ${hashedtokenId, tokenId}`)
        const tokenURI = `http://localhost:3000/nft-cert/${tokenId}`;
        const transactionHash = await certificatetoNFT(badgeDataString,tokenId,tokenURI) //certificatetoNFT(badgeDataString);
        const nft_value = {
            tx: transactionHash, 
            generatedtokenid: generatedtokenId,
            tokenid: tokenId.toString(), 
            hashedtokenid:hashedtokenId.toString(), 
            tokenuri: tokenURI
        };
       
        // Insert certificate into the database
        const assigncertificatequery = 
            `insert into assign_certificate (user_id, institution_name, course_name, total_hours, date_completion, json_values, nft_value,tokenURI,txhash,tokenid) values(?,?,?,?,?,?,?,?,?,?)`;
        console.log(`nft_value ${JSON.stringify(nft_value)}`)

        db.pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting connection from pool:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            connection.query(assigncertificatequery, [student_id, institution_name, course_name, total_hours, date_completion, badgeDataString, JSON.stringify(nft_value),tokenURI,transactionHash,tokenId], (err, results) => {
                connection.release();
                if (err) { 
                    console.error('Error executing query:', err);
                    return res.status(500).json({ error: `Internal server error ${err}` });
                }
                
                res.json({ message: 'Certificate assigned successfully', results });
            });
        });
   
});

// This function mints an NFT using the badge data
async function certificatetoNFT(badgeDataString, tokenId,tokenURI) {
    // these are all hardhat values
    //const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
    const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80' 
    const providerUrl = 'http://127.0.0.1:8545'
    // Initialize a provider
    const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');

    // Create a wallet instance using the private key and provider
    const wallet = new ethers.Wallet(privateKey, provider);

    // Create a contract instance connected to your wallet
    const contract = new ethers.Contract(contractAddress, mycredsABI, wallet);

    // Call the mint function from your contract
    try {
        const transaction = await contract.mint(tokenId, tokenURI, badgeDataString);
        await transaction.wait();  // Wait for the transaction to be mined
        console.log('NFT minted! Transaction Hash:', transaction.hash);
        return transaction.hash;
    } catch (error) {
        console.error('Failed to mint NFT:', error);
    }
}

// need a get endpoint to return all results from this query select * from mycreds360.certificate;
app.get('/certificate', (req, res) => {
    const query = `select * from certificate`;
    db.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        connection.query(query, (err, results) => {
            connection.release();
            if (err) { 
                console.error('Error executing query:', err);
                return res.status(500).json({ error: `Internal server error ${err}` });
            }
            // Ensure that image_url paths are relative to the '/images' URL
            results.forEach(record => {
                if (record.image_url && record.image_url.startsWith('uploads/')) {
                    record.image_url = `/images/${record.image_url.replace('uploads/', '')}`;
                }
            });
            return res.json(results);
        });
    });
});

app.get('/certificate-image/:id', (req, res) => {
    const certificateId = req.params.id;

    // Fetch certificate to get the image path
    const query = `SELECT image_url FROM certificate WHERE id = ?`;
    db.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        connection.query(query, [certificateId], (err, results) => {
            connection.release();
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'Certificate not found' });
            }

            const imageUrl = results[0].image_url;

            if (imageUrl && imageUrl.startsWith('uploads/')) {
                const imagePath = path.join(__dirname, 'uploads', imageUrl.replace('uploads/', ''));
                
                // Check if file exists
                fs.access(imagePath, fs.constants.F_OK, (err) => {
                    if (err) {
                        console.error('File not found:', err);
                        return res.status(404).json({ error: 'Image not found' });
                    }

                    // Set appropriate content type and send the file
                    res.sendFile(imagePath);
                });
            } else {
                return res.status(400).json({ error: 'Invalid image path' });
            }
        });
    });
});

/*
* This endpoint will return the certificate as well but the front end
* will handle this specific to the JSON data.
*/
app.get('/certificate/:id', (req, res) => {
    const certificateId = req.params.id;

    const query = `SELECT image_url, image_json FROM certificate WHERE id = ?`;
    db.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        connection.query(query, [certificateId], (err, results) => {
            connection.release();
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'Certificate not found' });
            }

            const certificate = results[0];
            res.json(certificate);
        });
    });
});


// Example endpoint to save certificate template
app.post('/save-certificate-template', upload.single('file'),(req, res) => {
    // Handle incoming JSON data
    console.log(`saving certificate template data:`);
    const institutionId = req.body.institutionId;
    const fields = req.body.fields;
    const file = req.file;
    console.log(file);
    if (!institutionId || !file || !fields) {
        return res.status(400).json({ message: 'Missing required data' });
    }
    console.log(fields)

    // Process file URL
    const imageUrl = `uploads/${file.filename}`;
    const imageSvg = ''; // If you have SVG data
    const imageJson = JSON.stringify(fields); // Convert fields array to JSON string
    console.log(imageUrl, imageSvg, imageJson);
    //console.log('Received certificate template data:', templateData);
    // Prepare data for database insertion
    const sql = `INSERT INTO certificate (institution_id, image_url, image_svg, image_json, created_at, updated_at) 
                 VALUES (?, ?, ?, ?, NOW(), NOW())`;
    const values = [institutionId, imageUrl, imageSvg, imageJson];
    console.log(sql, values);

    db.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Use the connection to execute a query
        connection.query(sql, values, (err, results) => {
            // Release the connection back to the pool
            connection.release();

            if (err) { 
                console.error('Error executing query:', err);
                return res.status(500).json({ error: `Internal server error ${err}` });
            }

            return res.status(201).json({ message: 'Certificate template saved successfully' });
        });
    });
});

/*
*
*   This endpoint will return the badge data in JSON format based on the token id
*/
// Endpoint to upload metadata to IPFS
app.post('/upload-metadata', async (req, res) => {
    try {
        const metadata = req.body; // Assuming JSON body contains metadata

        const metadataBuffer = Buffer.from(JSON.stringify(metadata));
        const { cid } = await ipfs.add(metadataBuffer);

        const metadataURI = `ipfs://${cid}`;
        console.log('Metadata uploaded to IPFS:', metadataURI);

        res.json({ metadataURI });
    } catch (error) {
        console.error('Failed to upload metadata to IPFS:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/*
*   Get certificate meta data from smart contract based on token id
*/
app.get('/nft-cert/:tokenId', async (req, res) => {
    const tokenId = parseInt(req.params.tokenId);
    const bigTokenId = BigInt(tokenId);
    const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80' 
    const providerUrl = 'http://127.0.0.1:8545'
    // Initialize a provider
    const provider = new ethers.JsonRpcProvider('http://localhost:8545');   
    // Create a wallet instance using the private key and provider
    const wallet = new ethers.Wallet(privateKey, provider);
    // Create a contract instance connected to your wallet
    const contract = new ethers.Contract(contractAddress, mycredsABI, wallet);
    // call getTokenJsonData() function from your contract
    try {

        const tokenJsonData = await contract.getTokenJsonData(bigTokenId);
        // Handle BigNumber to string conversion
        const jsonData = tokenJsonData.toString();
        console.log('Token JSON Data:', tokenJsonData);
        return res.json(JSON.parse(jsonData));
    } catch (error) {
        console.error('Failed to get token JSON data:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

/*
* This endpoint will query the assign_certificate table based on user_id and return the json_values
* which is the badge data in json format.  
*
*/
app.get('/student-certificates/:student_id', (req, res) => {
    const { student_id } = req.params;
    const query = `select * from assign_certificate where user_id = ?`;
    db.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        connection.query(query, [student_id], (err, results) => {
            connection.release();
            if (err) { 
                console.error('Error executing query:', err);
                return res.status(500).json({ error: `Internal server error ${err}` });
            }
            return res.json(results);
        });
    });
});

// I need an endpoint that will handle this URL http://localhost:3000/assign-certificate/234/448.
// this will query the assign_certificate table based on the user_id and the certificate_id and get the json_values and display it
app.get('/assign-certificate/:student_id/:certificate_id', (req, res) => {
    const { student_id, certificate_id } = req.params;
    const query = `select * from assign_certificate where user_id = ? and id = ?`;
    db.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        connection.query(query, [student_id, certificate_id], (err, results) => {
            connection.release();
            if (err) { 
                console.error('Error executing query:', err);
                return res.status(500).json({ error: `Internal server error ${err}` });
            }
            return res.json(results);
        });
    });
});

//get all assign certificates records by user_id
app.get('/assign-certificate/:student_id', (req, res) => {
    const {student_id} = req.params;
    console.log(`assign-certificate ${student_id}`)
    const query = `select * from assign_certificate where user_id = ?`;

    db.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        // Use the connection to execute a query
        connection.query(query, [student_id], (err, results) => {
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

//get all assign certificates records
app.get('/assign-certificate', (req, res) => {
    //const {student_id} = req.body;
    //console.log(student_id)
    const query = `select * from assign_certificate`;

    db.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        // Use the connection to execute a query
        connection.query(query, (err, results) => {
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

app.get('/analytics/badges', (req, res) => {
    const query = `SELECT 
                    DATE_FORMAT(mycreds360.badges.date_completion, '%Y-%m') AS month,
                    AVG(DATEDIFF(mycreds360.badges.created_at, mycreds360.badges.date_completion)) AS avg_days_to_issue,
                    COUNT(*) AS badges_issued
                FROM 
                    mycreds360.badges
                GROUP BY 
                    DATE_FORMAT(mycreds360.badges.date_completion, '%Y-%m')
                ORDER BY 
                    month;`;

    db.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        // Use the connection to execute a query
        connection.query(query, (err, results) => {
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

app.get('/dashboard/data', (req, res) => {
    const  userId  = req.query.userId;
    //console.log(userId)
    // Placeholder for actual dashboard data
    db.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const query = `SELECT 
                        up.first_name,
                        up.last_name
                        FROM 
                        mycreds360.users u
                        JOIN 
                        mycreds360.userprofiles up ON u.id = up.user_id
                        WHERE u.id = ?
                        GROUP BY 
                        up.first_name, up.last_name;`
        const _query = `SELECT 
                        up.first_name,
                        up.last_name,
                        (SELECT COUNT(*) FROM mycreds360.users WHERE status = 1) AS active_users,
                        (SELECT COUNT(*) FROM mycreds360.users WHERE status = 0) AS inactive_users,
                        (SELECT COUNT(*) FROM mycreds360.badges) AS total_badges,
                        (SELECT COUNT(*) FROM mycreds360.assign_certificate) AS total_certificates
                    FROM 
                        mycreds360.users u
                    JOIN 
                        mycreds360.userprofiles up ON u.id = up.user_id
                    WHERE 
                        u.id = ?
                    GROUP BY 
                        up.first_name, up.last_name;
`
        // Use the connection to execute a query
        connection.query(_query,[userId], (err, results) => {
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
*   Create a new user record, then take the user_id generated from users.user_id
*  and insert a new record into userprofiles table
*/
app.post('/students/create', upload.single('user_photo'), (req, res) => {
    const { user_id, email, first_name, last_name, mobile_no } = req.body;
    const user_photo = req.file ? req.file.path : null; // Assuming req.file contains the uploaded file information
    if (!user_id || !email || !first_name || !last_name || !mobile_no) {
        return res.status(400).json({ error: 'Email, first name, last name, and mobile number are required.  A user account must also be created first.' });
    }
    db.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        // Use the connection to execute a query
        connection.query('INSERT INTO userprofiles (user_id, first_name, last_name, mobile_no, user_photo) VALUES (?, ?, ?, ?, ?)', [user_id, first_name, last_name, mobile_no, user_photo], (err, results) => {
            // Release the connection back to the pool
            connection.release();
    
            if (err) { 
                console.error('Error executing query:', err);
                return res.status(500).json({ error: `Internal server error ${err}` });
            }
            
            return res.status(201).json({ message: 'Student created successfully', student_id: results.insertId });
        });
    });
});


/*
*   Students have roles set to 7
*/
app.get('/students', (req, res) => {
    db.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        // Execute the parameterized query
        const query = `
            SELECT 
                u.id, 
                u.email, 
                up.first_name, 
                up.last_name, 
                up.mobile_no, 
                up.user_photo, 
                COUNT(DISTINCT b.id) AS no_of_badges,
                COUNT(DISTINCT ac.id) AS no_of_certificates
            FROM 
                mycreds360.users u
            JOIN 
                mycreds360.userprofiles up ON u.id = up.user_id
            JOIN 
                mycreds360.role_user ru ON u.id = ru.user_id
            LEFT JOIN 
                mycreds360.badges b ON u.id = b.user_id
            LEFT JOIN 
                mycreds360.assign_certificate ac ON u.id = ac.user_id 
            WHERE 
                ru.role_id = 7
            GROUP BY 
                u.id, u.email, up.first_name, up.last_name, up.mobile_no, up.user_photo
            ORDER BY up.first_name ASC`;

        // Use the connection to execute a query
        connection.query(query, (err, results) => {
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

app.get('/users', async (req, res) => {
    db.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        // Use the connection to execute a query
        connection.query(`SELECT * FROM users ORDER BY email ASC`, (err, results) => {
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
*  This endpoint will return all institutions that have not created a template for their certificate
*/
app.get('/institution/unused', (req, res) => {
    // Placeholder for actual institution index
    db.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        // Use the connection to execute a query
        connection.query(`SELECT i.id, i.institution_name FROM mycreds360.institution i LEFT JOIN mycreds360.certificate c ON i.id = c.institution_id WHERE c.institution_id IS NULL;`, (err, results) => {
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

// Example Express.js endpoint to save template positions
app.post('/save-template-positions', (req, res) => {
    const { fields } = req.body;

    // Validate and process the fields to save in your database
    // Example using Sequelize ORM for MySQL database
    Certificate.create({
        institution_id: 1, // Example institution ID
        image_url: '', // Example image URL
        image_svg: '', // Example SVG data
        image_json: JSON.stringify(fields), // Save fields as JSON string
        created_at: new Date(),
        updated_at: new Date(),
    })
    .then(() => {
        res.status(200).send('Template positions saved successfully');
    })
    .catch((error) => {
        console.error('Error saving template positions:', error);
        res.status(500).send('Failed to save template positions');
    });
});

    // Example Express.js endpoint to get saved template positions
    app.get('/get-template-positions', (req, res) => {
        // Example using Sequelize ORM for MySQL database
        Certificate.findOne({
            order: [['created_at', 'DESC']], // Example: Get latest entry
        })
        .then((certificate) => {
            if (certificate) {
                res.status(200).json(certificate);
            } else {
                res.status(404).send('Template positions not found');
            }
        })
        .catch((error) => {
            console.error('Error getting template positions:', error);
            res.status(500).send('Failed to get template positions');
        });
    });


/*
*   Need to add capability to save institution's logo image
*   and a signature image   
*/
app.post('/institution/create', (req, res) => {
    
    const { institution_name, institution_url } = req.body;
    const logo = req.file ? req.file.path : ''; // Assuming req.file contains the uploaded file information
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
        connection.query('INSERT INTO institution (institution_name, logo, institution_url) VALUES (?, ?,?)', [institution_name, logo, institution_url], (err, results) => {
            // Release the connection back to the pool
            connection.release();
    
            if (err) { 
                console.error('Error executing query:', err);
                return res.status(500).json({ error: `Internal server error ${err}` });
            }
            console.log(`success`)
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
            //console.log(results)
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

app.get('/newcourses', (req, res) => {
    db.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        // Use the connection to execute a query
        connection.query(`SELECT * FROM newcourses`, (err, results) => {
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


app.post('/newcourses/create', (req, res) => {
    const { course_name, description } = req.body;
    //console.log(course_name, description)
    const query = `insert into newcourses 
                   (course_name, description, created_at, updated_at) 
                   values(?,?,?,?);`
    db.pool.getConnection((err, connection) => {   
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        connection.query(query, [course_name, description, new Date(), new Date()], (err, results) => {
            // Release the connection back to the pool
            connection.release();
            if (err) { 
                console.error('Error executing query:', err);
                return res.status(500).json({ error: `Internal server error ${err}` });
            }
            return res.json({results})
        });
    });

    //res.send('Form to create a new course');
});

// Using app.get and app.post directly
app.get('/courses', (req, res) => {
    db.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        // Use the connection to execute a query
        connection.query(`SELECT * FROM courses`, (err, results) => {
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

app.get('/courses/create', (req, res) => {
    res.send('Form to create a new course');
});

// This route will generate the badge to be issued to the student
app.post('/create-student-badge', async (req, res) => {
    const { course_id, course_name, date_completion, status, reference_id } = req.body;
    const query = `insert into mycreds360.badges 
                    (course_id, course_name, date_completion, status, reference_id) 
                    values(?,?,?,?,?)`;
    db.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        connection.query(query, [course_id, course_name, date_completion, status, reference_id], (err, results) => {
            // Release the connection back to the pool
            connection.release();
            if (err) { 
                console.error('Error executing query:', err);
                return res.status(500).json({ error: `Internal server error ${err}` });
            }
            return res.json({results})
        });
    });
});

// This route will generate the badge to be issued to the student
app.post('/createbadge', upload.single('badge'),async (req, res) => {
    // I need to get from req.body the course name, description and the image file 
    const { course_name, description } = req.body;
    const badge = req.file ? req.file.path : ''; // Assuming req.file contains the uploaded file information
    //console.log(req.file);  // Check if the file is being received
    //console.log(req.body);  // Log the body to see all form data
    console.log(course_name, description)
    
    db.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const query = `insert into courses 
                        (course_name, description, badge) 
                        values(?,?,?)`
        connection.query(query, [course_name, description, badge], (err, results) => {
            // Release the connection back to the pool
            connection.release();
            if (err) { 
                console.error('Error executing query:', err);
                return res.status(500).json({ error: `Internal server error ${err}` });
            }
            return res.json({results})
        });
    });
});


app.get('/roles', (req, res) => {
    db.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const query = `select up.id, up.user_id, up.first_name, up.last_name, roles.label 
                        from mycreds360.userprofiles up
                        join mycreds360.role_user ru on up.user_id = ru.user_id
                        join mycreds360.roles roles on roles.id = ru.role_id;`
        // Use the connection to execute a query
        connection.query(query, (err, results) => {
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
        const query = 'SELECT * FROM users WHERE email = ?';
        connection.query(query,[email], (err, results) => {
            // Release the connection back to the pool
            connection.release();
    
            if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: `Internal server error ${err}` });
            }
    
            // Return the query results
            if (results.length === 0) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

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

// Stripe payament CC
app.post('/create-payment-intent', async (req, res) => {
    const { amount, currency } = req.body;
    
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,  // Amount in cents
            currency: currency,
            payment_method_types: ['card'],
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Redirect root to dashboard
app.get('/', (req, res) =>  res.redirect('/dashboard'));