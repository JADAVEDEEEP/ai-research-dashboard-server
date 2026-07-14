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
const allowedOrigins = [
    'https://ai-powered-research-dashboard-clien.vercel.app',
    'http://localhost:5173',
    ...(process.env.CLIENT_URL
        ? process.env.CLIENT_URL.split(',').map((origin) => origin.trim())
        : []),
];

const corsOptions = {
    origin(origin, callback) {
        if (
            !origin ||
            allowedOrigins.includes(origin) ||
            origin.endsWith('.vercel.app')
        ) {
            return callback(null, true);
        }

        return callback(null, true);
    },
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'AI Research Agent API is running.',
    });
});

app.use('/api',reportRouter);

connectdb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(() => {
        process.exit(1);
    });
