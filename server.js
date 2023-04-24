const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const OpenAIAPIKey = process.env.OpenAIAPIKey;
module.exports = OpenAIAPIKey;

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api-key', (req, res) => {
    res.json({ OpenAIAPIKey });
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});