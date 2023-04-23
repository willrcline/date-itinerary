const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});