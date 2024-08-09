const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get('/api', (req, res) => {
  res.send('API is working');
});

// Serve static files from the 'src/assets' directory
app.use('/src/assets', express.static(path.join(__dirname, 'src', 'assets')));

app.get('/api/chapter/:chapterId', (req, res) => {
  const chapterId = req.params.chapterId;
  const filePath = path.join(__dirname, 'src', 'chapters', `${chapterId}.json`);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({'error': 'Error while loading the chapter'});
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.get('/api/:chapterId/texts', (req, res) => {
  const chapterId = req.params.chapterId;
  const filePath = path.join(__dirname, 'src', 'assets', 'texts.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({'error': 'Error while loading the texts'});
      return;
    }

    const texts = JSON.parse(data);
    const chapterTexts = texts[chapterId];

    if (!chapterTexts) {
      res.status(404).json({'error': 'Chapter not found'});
      return;
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.json(chapterTexts);
  });
});


app.get('/api/selectInterval/randomNotes', (req, res) => {
  const randomNotes = [];
  let randomIndex1 = Math.floor(Math.random() * notes.length);
  randomNotes.push(notes[randomIndex1]);

  let randomIndex2;
  do {
    randomIndex2 = Math.floor(Math.random() * notes.length);
  } while (Math.abs(randomIndex2 - randomIndex1) >= 8);

  randomNotes.push(notes[randomIndex2]);

  const intervals = ['unisono', 'velka sekunda', 'velka tercie', 'kvarta', 'kvinta', 'velka sexta', 'velka septima', 'oktava'];
  let intervalDistance = Math.abs(randomNotes[1].id - randomNotes[0].id);
  let correctInterval = intervalDistance === 0 ? 'unisono' : intervalDistance === 1 ? 'velka sekunda'  : intervalDistance === 2 ? 'velka tercie' : intervalDistance === 3 ? 'kvarta' : intervalDistance === 4 ? 'kvinta' : intervalDistance === 5 ? 'velka sexta' : intervalDistance === 6 ? 'velka septima' : 'oktava';

  let wrongIntervals = intervals.filter(interval => interval !== correctInterval);
  // Randomly select two intervals from the wrongIntervals array
  let optionsIntervals = [];
  for(let i = 0; i < 2; i++) {
    let randomIndex = Math.floor(Math.random() * wrongIntervals.length);
    optionsIntervals.push(wrongIntervals[randomIndex]);
    wrongIntervals.splice(randomIndex, 1); // Remove the selected interval from the array
  }

  // Add the correct interval to the optionsIntervals
  optionsIntervals.push(correctInterval);
  optionsIntervals.sort(() => Math.random() - 0.5); // Shuffle the array

  res.json({notes: randomNotes, correctInterval: correctInterval, optionsIntervals: optionsIntervals, correctIntervalSize: intervalDistance});
});


const notes = [
  { id: 1, tone: 'C4', frequency: 261.63, index: 1, HTMLelement: null},
  { id: 2, tone: 'D4', frequency: 293.66, index: 1, HTMLelement: null},
  { id: 3, tone: 'E4', frequency: 329.63, index: 1, HTMLelement: null},
  { id: 4, tone: 'F4', frequency: 349.23, index: 1, HTMLelement: null},
  { id: 5, tone: 'G4', frequency: 391.99, index: 1, HTMLelement: null},
  { id: 6, tone: 'A4', frequency: 440.00, index: 1, HTMLelement: null},
  { id: 7, tone: 'B4', frequency: 493.88, index: 1, HTMLelement: null},
  { id: 8, tone: 'C5', frequency: 523.25, index: 1, HTMLelement: null},
  { id: 9, tone: 'D5', frequency: 587.33, index: 1, HTMLelement: null},
  { id: 10,tone: 'E5', frequency: 659.25, index: 1, HTMLelement: null},
  { id: 11,tone: 'F5', frequency: 698.46, index: 1, HTMLelement: null},
  { id: 12,tone: 'G5', frequency: 783.99, index: 1, HTMLelement: null}
];

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});