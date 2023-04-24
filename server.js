const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const OpenAIAPIKey = process.env.OpenAIAPIKey;

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/openai-api-key', (req, res) => {
    res.json({ OpenAIAPIKey });
  });

const axios = require('axios');

app.get('/proxy-serp-api', async (req, res) => {
try {
    const apiKey = 'bc07e284e5247ec2ea3d7446fa38f0ceb101ac770aae337a65cf001156857018';
    const params = req.query;
    params.api_key = apiKey;
    const apiUrl = 'https://serpapi.com/search.json';
    
    const response = await axios.get(apiUrl, { params });
    res.json(response.data);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching data from the API' });
}
});
  


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});