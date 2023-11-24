const express = require('express')
const bodyParser = require('body-parser');
const req = require('express/lib/request');

const app = express()
const port = 3621
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

let leaderboard = [];

app.get('/', (req, res) => {
  res.send('rawr')
})

app.get('/leaderboard', (req, res) => {
    res.sendFile(__dirname + "/sites/leaderboard.html");
})

app.get("/leaderboard-api", (req, res) => {
    res.send(leaderboard.slice(0, 15));
})

app.get("/questions", (req, res) => {
    res.sendFile(__dirname + "/assets/questions.json");
})

app.get("/quiz", (req, res) => {
    res.sendFile(__dirname + "/sites/quiz.html");
})

app.post("/collect", (req, res) => {
    let leaderboardEntry = {
        name: req.body.name,
        correct: req.body.correct,
        time: req.body.time
    }
    leaderboard.push(leaderboardEntry);
    leaderboard = leaderboard.sort((a, b) => {
        if (a.correct === b.correct) {
            return a.time - b.time;
        }
        return b.correct - a.correct;
    });
    res.send("{\"result\": \"success\", \"place\": " + (leaderboard.indexOf(leaderboardEntry) + 1) + "}");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})