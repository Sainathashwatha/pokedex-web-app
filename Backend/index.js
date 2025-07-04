const express = require('express');
const cors = require('cors');
const app = express();
const pokemonRoutes = require('./routes/pokemon');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '../frontend/images')));
app.use('/api/pokemon', pokemonRoutes);

app.listen(3000, () => console.log(' Server running on http://localhost:3000'));

 