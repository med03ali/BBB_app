require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bbbRoutes = require('./routes/bbbRoutes');
const authRoutes = require('./routes/authRoutes');
const meetingsRoutes = require('./routes/meetingsRoutes');
const recordsRoutes = require('./routes/recordsRoutes')



const app = express();
const PORT = process.env.PORT 


app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/meetings', meetingsRoutes);
app.use('/api/records', recordsRoutes);
app.use('/api/bbb', bbbRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

