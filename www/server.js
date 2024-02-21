const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const fs = require('fs');


const signupsPath = 'data/signups.txt';
const app = express();
const port = 3002;

const slackWebhookURL = 'https://hooks.slack.com/services/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';

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '.')));

app.post('/forwardemail', function(req, res) {
    let email = req.body.email;
    
    fs.access(signupsPath, fs.constants.F_OK, (err) => {
        // Check if file exists
        if (err) {
            console.log('Signups file does not exist. Creating it now...');
            fs.writeFile(signupsPath, email + '\n', (err) => {
              if(err) {
                return console.log('An error occurred while creating the signups file.', err);
               }
               
               console.log('Signups file successfully created and data written!');
               console.log('Appended signup ' + email);
            });
        } else {
            console.log('Appending signup ' + email);
            fs.appendFile(signupsPath, email + '\n', (err) => {
                if(err) {
                    return console.log('An error occurred while appending signup " + email + " to the signup file.', err);
                }
                
                console.log(email + ' successfully appended to the signup file');
            });
        }
    });

    axios.post(slackWebhookURL, {
        text: `The following email was submitted: ${email}`,
    })
    .then(function (response) {
        console.log('Slack message sent: ' + response.status);
        return res.status(200).send('Email forwarded to Slack channel');
    })
    .catch(function (error) {
        console.log(error);
        return res.status(500).send('Error while forwarding the email to Slack channel');
    });
});

app.listen(port, () => {
    console.log(`Email forwarder running at http://localhost:${port}`)
})