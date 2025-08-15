const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const bbbRoutes = require('./routes/bbbRoutes');
const authRoutes = require('./routes/authRoutes');
const meetingsRoutes = require('./routes/meetingsRoutes');



const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/meetings', meetingsRoutes);
app.use('/api/bbb', bbbRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

