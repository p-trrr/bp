const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/api', (req, res) => {
  res.send('API is working');
});
app.get('/notes', (req, res) => {
  fs.readFile('./src/notes.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Chyba při čtení souboru notes.json');
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
