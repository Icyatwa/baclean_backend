
// workerRoutes.js
const express = require('express');
const router = express.Router();
const workerController = require('../controllers/workerController');
router.post('/', workerController.createWorker);
router.get('/', workerController.getAllWorkers);
router.get('/employee/:workerId', workerController.getWorkers);
router.get('/:workerId', workerController.getWorkersByWorkerId);
router.get('/worker/:workerId', workerController.getWorkerById);
router.get('/search', workerController.searchWorkersByJob);
router.get('/jobs', workerController.getUniqueJobs);
router.get('/unique/countries', workerController.getUniqueCountries);
router.get('/unique/provinces', workerController.getUniqueProvinces);
router.get('/unique/districts', workerController.getUniqueDistricts);
router.get('/unique/sectors', workerController.getUniqueSectors);
router.get('/unique/cells', workerController.getUniqueCells);
router.get('/unique/educations', workerController.getUniqueEducations);
router.get('/unique/jobs', workerController.getUniqueJobs);
router.put('/:workerId', workerController.updateWorker);
router.delete('/:workerId', workerController.deleteWorker);


module.exports = router;
