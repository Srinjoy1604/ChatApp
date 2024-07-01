const express = require('express');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const { createServer } = require('node:http');
const app = express();
const server=createServer(app);
const io= new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true,
    },
}); 
const cors = require('cors');
const connectDB = require('./db/db.config')
const userRoutes = require('./routes/user.route')

dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());

app.options('*', cors()); // Handle preflight requests
io.on("connection",(socket)=>{
    console.log("User Connected:",socket.id);
    socket.emit("welcome","Welcome to server");
    socket.broadcast.emit("welcome",`${socket.id} joined the server.`);
    socket.on("message",(data)=>{
        console.log(data);
        socket.to(data.room).emit("recieved-message", data.message);
    });
    socket.on("disconnect",()=>{
        console.log(`User ${socket.id} Disconnected`);
    });
    socket.on("join-room",(room)=>{
        socket.join(room);
        console.log(`User joined ${room}`);
    });
    socket.on("Leave-room",(room)=>{
        socket.leave(room);
        console.log(`${socket.id} left room: ${room}`);
    });
});
app.use('/api/users', userRoutes);

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
server.listen(PORT, () => {
    console.log(`App has started on PORT: ${PORT}`);
});