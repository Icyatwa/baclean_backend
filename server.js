
// // server.js
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/database');
// const http = require('http');
// const socketIo = require('socket.io');
// const workerRoutes = require('./routes/workerRoutes');

// const app = express();
// const PORT = process.env.PORT || 5000;
 
// app.use(cors());
// app.use(express.json());

// app.use('/api/workers', workerRoutes);

// const server = http.createServer(app);
// const io = socketIo(server);

// module.exports.io = io;
// connectDB()
//   .then(() => {
//     server.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const workerRoutes = require('./routes/workerRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/workers', workerRoutes);

const server = http.createServer(app);
const io = socketIo(server);

module.exports.io = io;
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
