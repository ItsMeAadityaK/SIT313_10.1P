const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Add CORS for cross-origin requests
const mailgun = require('mailgun-js');

const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Use JSON parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const api_key = 'ec488aaf2a22fcd2231a78be92a614b0-a26b1841-836dcf00';
const domain = 'sandbox009820f5457e4200a754ccfb992a6ba2.mailgun.org';
const mg = mailgun({ apiKey: api_key, domain: domain });

app.post("/submit-email", (req, res) => {
    const email = req.body.email;
    console.log(`Received email: ${email}`);

    const data = {
        from: 'DEV@Deakin <kulkarniaadi65@gmail.com>',
        to: email,
        subject: 'Welcome to DEV@Deakin!',
        text: 'Thank you for subscribing to DEV@Deakin! We are excited to have you as part of our community.'
    };

    mg.messages().send(data, (error, body) => {
        if (error) {
            console.log(error);
            return res.status(500).send("Error sending email");
        }
        console.log(body);
        res.send("Email submitted successfully");
    });
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
