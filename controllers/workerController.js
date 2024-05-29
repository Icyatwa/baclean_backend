// workerController.js
const Worker = require('../models/workerModel');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.createWorker = [upload.single('image'), async (req, res) => {
  try {
    const {
      workerId,
      username,
      phoneNumber,
      country,
      province,
      district,
      sector,
      cell,
      education,
      experience,
      job,
      salary,
    } = req.body;

    let imageUrl = '';
    if (req.file) {
      const imageName = `${Date.now()}-${req.file.originalname}`;
      const imagePath = path.join(__dirname, '../uploads', imageName);
      await sharp(req.file.buffer)
        .resize(300, 300)
        .toFile(imagePath);
      imageUrl = `/uploads/${imageName}`;  // Save the relative path
    }

    const newWorker = new Worker({
      workerId,
      username,
      phoneNumber,
      country,
      province,
      district,
      sector,
      cell,
      education,
      experience,
      job,
      salary,
      imageUrl,
    });

    const savedWorker = await newWorker.save();
    res.status(201).json(savedWorker);
  } catch (error) {
    console.error('MongoDB Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}];



// exports.createWorker = async (req, res) => {
//   try {
//     const {
//       workerId,
//       username,
//       phoneNumber,
//       country,
//       province,
//       district,
//       sector,
//       cell,
//       education,
//       experience,
//       job,
//       salary,
//     } = req.body;
    
//     const newWorker = new Worker({
//       workerId,
//       username,
//       phoneNumber,
//       country,
//       province,
//       district,
//       sector,
//       cell,
//       education,
//       experience,
//       job,
//       salary,
//     });
    
//     const savedWorker = await newWorker.save();

//     res.status(201).json(savedWorker);
//   } catch (error) {
//     console.error('MongoDB Error:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

exports.getAllWorkers = async (req, res) => {
  try {
    const workers = await Worker.find();
    res.status(200).json(workers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getWorkersByWorkerId = async (req, res) => {
  const workerId = req.params.workerId;
  try {
    const workers = await Worker.find({ workerId });
    res.status(200).json(workers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getWorkerById = async (req, res) => {
  const workerId = req.params.workerId;
  try {
    const worker = await Worker.findById(workerId);
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    res.status(200).json(worker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateWorker = async (req, res) => {
  const workerId = req.params.workerId;
  const updateData = req.body;
  try {
    const updatedWorker = await Worker.findByIdAndUpdate(workerId, updateData, { new: true });
    if (!updatedWorker) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    res.status(200).json(updatedWorker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteWorker = async (req, res) => {
  const workerId = req.params.workerId;
  try {
    const deletedWorker = await Worker.findByIdAndDelete(workerId);
    if (!deletedWorker) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    res.status(200).json({ message: 'Worker deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.searchWorkersByJob = async (req, res) => {
  const jobCategory = req.query.job;
  try {
    const workers = await Worker.find({ job: { $regex: jobCategory, $options: 'i' } });
    res.status(200).json(workers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getUniqueJobs = async (req, res) => {
  try {
    const jobs = await Worker.distinct('job');
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getUniqueCountries = async (req, res) => {
  try {
    const countries = await Worker.distinct('country');
    res.status(200).json(countries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getUniqueProvinces = async (req, res) => {
  try {
    const provinces = await Worker.distinct('province');
    res.status(200).json(provinces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getUniqueDistricts = async (req, res) => {
  try {
    const districts = await Worker.distinct('district');
    res.status(200).json(districts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getUniqueSectors = async (req, res) => {
  try {
    const sectors = await Worker.distinct('sector');
    res.status(200).json(sectors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getUniqueCells = async (req, res) => {
  try {
    const cells = await Worker.distinct('cell');
    res.status(200).json(cells);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getUniqueEducations = async (req, res) => {
  try {
    const educations = await Worker.distinct('education');
    res.status(200).json(educations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getUniqueJobs = async (req, res) => {
  try {
    const jobs = await Worker.distinct('job');
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
