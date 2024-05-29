// // workerModel.js
// const mongoose = require('mongoose');

// const workerSchema = new mongoose.Schema({
//   workerId: { type: String, required: true },
//   username: { type: String, required: true },
//   picture: { type: String },
//   phoneNumber: { type: String, required: true },
//   country: { type: String, required: true },
//   province: { type: String, required: true },
//   district: { type: String, required: true }, 
//   sector: { type: String, required: true },
//   cell: { type: String, required: true },
//   education: { type: String, required: true },
//   experience: { type: String, required: true },
//   job: { type: String, required: true },
//   salary: { type: String, required: true },
// }, { timestamps: true });

// const Worker = mongoose.model('Worker', workerSchema);

// module.exports = Worker;


// workerModel.js
const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  workerId: { type: String, required: true },
  username: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  country: { type: String, required: true },
  province: { type: String, required: true },
  district: { type: String, required: true }, 
  sector: { type: String, required: true },
  cell: { type: String, required: true },
  education: { type: String, required: true },
  experience: { type: String, required: true },
  job: { type: String, required: true },
  salary: { type: String, required: true },
  imageUrl: { type: String } // New field for image URL
}, { timestamps: true });

const Worker = mongoose.model('Worker', workerSchema);

module.exports = Worker;
