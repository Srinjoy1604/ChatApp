const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const connectDB = require('./db/db.config')
const userRoutes = require('./routes/user.route')

dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());

app.options('*', cors()); // Handle preflight requests

app.use('/users', userRoutes);

app.get("/", (req, res) => {
    res.json("hello");
});

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'OK' });
});

app.get('*', (req, res) => {
    res.status(404).json({ error: 'route not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App has started on PORT: ${PORT}`);
});