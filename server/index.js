const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors())
connectDB();

app.use(express.json());

app.use('/api/requestLand', require('./routes/api/requestLand'));
app.use('/api/search', require('./routes/api/search'));
app.use('/api/faqs', require('./routes/api/faqs'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
