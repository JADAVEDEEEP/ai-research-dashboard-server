const express = require('express');
const connectdb = require('./config/db');
require('dotenv').config();
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const reportRouter = require('./routes/reportrouter');
const app = express();

const PORT = process.env.PORT || 5000;
const allowedOrigin = process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(',').map((origin) => origin.trim())
    : '*';

app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '1mb' }));
app.use(cors({
    origin: allowedOrigin,
}));

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'AI Research Agent API is running.',
    });
});

app.use('/api',reportRouter)

connectdb()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
