import { Router } from 'express';
import { teeTimeController } from '../../assembly';

const router = Router();

// Scrape tee times and save to database
router.post('/scrape', (req, res) => teeTimeController.scrapeTeeTimesAndSave(req, res));

// Get all tee times
router.get('/', (req, res) => teeTimeController.getAllTeeTimes(req, res));

// Get all tee times for a specific date
router.get('/date/:date', (req, res) => teeTimeController.getTeeTimesByDate(req, res));

// Get a tee time by ID
router.get('/:id', (req, res) => teeTimeController.getTeeTimeById(req, res));

// Create a new tee time
router.post('/', (req, res) => teeTimeController.createTeeTime(req, res));

// Update a tee time by ID
router.put('/:id', (req, res) => teeTimeController.updateTeeTime(req, res));

// Delete a tee time by ID
router.delete('/:id', (req, res) => teeTimeController.deleteTeeTime(req, res));

export default router;
