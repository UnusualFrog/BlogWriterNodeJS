const fs = require('node:fs');
var localJson;

// Initialise express app
var express = require('express')
var app = express()

// create application/json parser
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

// Expose files in www directory
app.use(express.static('www'));

// Helper Functions
function readLocalJSON() {
    localJson = JSON.parse(fs.readFileSync('./blog_posts.json', 'utf8'));
    console.log("Existing Data has been loaded")
}

function writeLocalJSON(body) {
    console.log("Writing to file:")
    // console.log(body)
    fs.writeFileSync('./blog_posts.json', JSON.stringify(body));
}

// GET request to the data route will return existing Blog Post Data
app.get('/data', (req, res, next) => {
    readLocalJSON()

    res.json(localJson)
})

// POST request to data route will update the current Blog Post Data
app.post('/data', jsonParser, (req, res) => {
    // console.log("Request body: ", req.body)
    writeLocalJSON(req.body)
    res.send("Blog Post updates received succesfully!")
})

// Run webserver hosting content from www on port 8080
var server = app.listen(8080, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Express app listening at http://%s:%s', host, port)

})