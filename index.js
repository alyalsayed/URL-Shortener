require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dns = require("dns");
const bodyParser = require("body-parser");
const validUrl = require("valid-url");
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use("/public", express.static(`${process.cwd()}/public`));
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

/*----------------Start of code----------------*/
const shortUrls = {};
let count = 1;

// Validate URL format
const isValidUrl = (url) => validUrl.isUri(url);

// Function to verify URL using DNS lookup
function verifyUrl(url, callback) {
  const parsedUrl = new URL(url);
  dns.lookup(parsedUrl.hostname, (err) => {
    callback(err === null);
  });
}

// POST route to create short URLs
app.post("/api/shorturl", function (req, res) {
  const { url } = req.body;

  if (!isValidUrl(url)) {
    return res.json({ error: "invalid url" });
  }

  verifyUrl(url, (isValid) => {
    if (!isValid) {
      return res.json({ error: "invalid url" });
    }

    const shortUrl = count++;
    shortUrls[shortUrl] = url;

    res.json({ original_url: url, short_url: shortUrl });
  });
});

// GET route to redirect to the original URL
app.get("/api/shorturl/:short_url", function (req, res) {
  const { short_url } = req.params;

  if (!shortUrls.hasOwnProperty(short_url)) {
    return res.json({ error: "invalid short url" });
  }

  const originalUrl = shortUrls[short_url];
  res.redirect(originalUrl);
});

/*----------------End of code----------------*/

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
