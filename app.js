const fs = require('node:fs');
var localJson;

// Initialise express app
var express = require('express')
var app = express()

// Expose files in www directory
app.use(express.static('www'));

test_data = {
    "1": {
        "ID": 1,
        "title": "Hello World",
        "main_content": "Hello World! This is my first real blog post so it will probably be a bit awkward. Today was nice, it was really sunny and warm, in spite of strong wind.\n\nI wanted to spend some time outside so I decided to clean up some trash in the lawn and cleaned the bird feeders so I can set them up now that winter is over. I'm looking forward to getting back into birding, I've been too stressed the last few months to make time for it.\n\nGF and I got groceries which was nice, especially the yummy cream buns they sell. We watched the end of the Pesci fight in Jojo part V, really a top tier fight. The train is a really cool setting for a stand fight, Araki must have thought so too given it comes back for part 7. \n\nWe're going swimming tonight which will be fun, even though I'm quite sore from a new workout routine. Overall it's been a really nice day.",
        "date_posted": "Tue, 05 May 2026 22:16:13 GMT",
        "tags": [
            "diary📗",
            "bird🦆",
            "jojo⭐️"
        ],
        "img": ""
    },
    "2": {
        "ID": 2,
        "title": "She Gambo on my nanza till I forget how to castle",
        "main_content": "Today was the last day of my break before my final semester of college, so I was a bit bummed out when I woke up, so I took a trip over to the gym to feel better. The weather has finally gotten nice enough for me to walk to the gym regularly and it has been a huge boost to my mood, vitamin D is a hell of a drug. I tried some new core exercises to challenge myself today, which went great, until an hour later when it hurt to cough.\n\nI've been playing Gambonanza, which is a shameless ripoff of Balatro, but with Chess, but it does a really good job of ripping off the best parts of Balatro (relaxing atmosphere, effective graphics, interesting synergies). I'm having fun with it, but its also making me feel really stupid at chess :p\n\nRegan and I made a delicious fried rice for dinner, we added chicken breast to our regular recipe and it did a lot to improve both the flavor and portion size of the meal, which was very nice. Regan added cream to the scrambled eggs, which made them extra fluffy and boosted the flavor of the rice by a lot.",
        "date_posted": "Mon, 11 May 2026 04:32:38 GMT",
        "tags": [
            "diary📗",
            "infinite games🎮️",
            "foodstuffs🍔",
            "gym💪"
        ],
        "img": "https://cdn.asoworld.com/img/f558bb37976a4479a1ecafdbc7387677.webp"
    },
    "3": {
        "ID": 3,
        "title": "Sheesh! There always seems to be a lot of police around when you don't need them! ",
        "main_content": "First day of the semester. Pulled over for bullshit. Car troubles. Water-boiler exploded. Infinite hell forever.\n\n\n\n\n:)",
        "date_posted": "Mon, 11 May 2026 18:24:05 GMT",
        "tags": [
            "diary📗",
            "infinite hell forever👿"
        ],
        "img": "https://i.kym-cdn.com/photos/images/original/002/454/639/098.jpg"
    },
}

function readLocalJSON() {
    // fs.readFile('./blog_posts.json', 'utf8', function (err, data) {
    //     if (err) throw err;
    //     localJson = JSON.parse(data);
    //     console.log("HEre: ", localJson)
    // });
    localJson = JSON.parse(fs.readFileSync('./blog_posts.json', 'utf8'));
    console.log("Inside: ", localJson)
}

// GET request to the data route will return existing Blog Post Data
app.get('/data', (req, res, next) => {

    readLocalJSON()
    console.log("Existing Data has been loaded")
    console.log("Outside: ", localJson)
    res.json(localJson)
})

// POST request to data route will update the current Blog Post Data
app.post('/data', (req, res, next) => {
    console.log("Updated Data has been recieved")
    res.send("Blog Post updates received succesfully!")
})

// Run webserver hosting content from www on port 8080
var server = app.listen(8080, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Express app listening at http://%s:%s', host, port)

})