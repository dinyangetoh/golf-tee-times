import { sendErrorApiResponse, sendFailApiResponse, sendSuccessApiResponse } from '../helpers/apiResponse';
export default class TeeTimeController {
    constructor(teeTimeService, course) {
        this.teeTimeService = teeTimeService;
        this.course = course;
    }
    /**
     * Scrape tee times from a golf course website and save them to the database
     */
    async scrapeTeeTimesAndSave(req, res) {
        try {
            let { url, date } = req.body;
            url = url || this.course.url;
            date = date || new Date().toISOString().split('T')[0];
            console.log(' Scrape data', { url, date, course: this.course });
            // Validate date format
            if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
                res.status(400).json({ error: 'Invalid date format. Please use YYYY-MM-DD' });
                return;
            }
            const teeTimes = await this.teeTimeService.scrapeTeeTimesAndSave(url, date, this.course);
            res.status(200).json(teeTimes);
            return sendSuccessApiResponse(res, teeTimes);
        }
        catch (error) {
            console.error('Error in scrapeTeeTimesAndSave controller:', error);
            return sendErrorApiResponse(res, error);
        }
    }
    /**
     * Get all tee times
     */
    async getAllTeeTimes(req, res) {
        try {
            const teeTimes = await this.teeTimeService.getAllTeeTimes();
            return sendSuccessApiResponse(res, teeTimes);
        }
        catch (error) {
            console.error('Error in getAllTeeTimes controller:', error);
            sendFailApiResponse(res, error);
        }
    }
    /**
     * Get all tee times for a specific date
     */
    async getTeeTimesByDate(req, res) {
        try {
            const { date } = req.params;
            if (!date) {
                return sendFailApiResponse(res, 'Date is required');
            }
            // Validate date format
            if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
                return sendFailApiResponse(res, 'Invalid date format. Please use YYYY-MM-DD');
            }
            const teeTimes = await this.teeTimeService.getTeeTimesByDate(date);
            return sendSuccessApiResponse(res, teeTimes);
        }
        catch (error) {
            console.error('Error in getTeeTimesByDate controller:', error);
            return sendErrorApiResponse(res, error);
        }
    }
    /**
     * Get a tee time by ID
     */
    async getTeeTimeById(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return sendFailApiResponse(res, 'ID is required');
            }
            const teeTime = await this.teeTimeService.getTeeTimeById(id);
            if (!teeTime) {
                return sendFailApiResponse(res, 'Tee time not found');
            }
            return sendSuccessApiResponse(res, teeTime);
        }
        catch (error) {
            console.error('Error in getTeeTimeById controller:', error);
            return sendErrorApiResponse(res, error, 500);
        }
    }
    /**
     * Create a new tee time
     */
    async createTeeTime(req, res) {
        try {
            const data = req.body;
            // Validate required fields
            const requiredFields = [
                'time',
                'price',
                'min_players',
                'max_players',
                'holes',
                'golfCourseName',
                'courseUrl',
                'date',
            ];
            const missingFields = requiredFields.filter((field) => !(field in data));
            if (missingFields.length > 0) {
                return sendFailApiResponse(res, `Missing required fields: ${missingFields.join(', ')}`);
            }
            const teeTime = await this.teeTimeService.createTeeTime(data);
            return sendSuccessApiResponse(res, teeTime, 201);
        }
        catch (error) {
            console.error('Error in createTeeTime controller:', error);
            return sendErrorApiResponse(res, error, 500);
        }
    }
    /**
     * Update a tee time by ID
     */
    async updateTeeTime(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            if (!id) {
                return sendFailApiResponse(res, 'ID is required');
            }
            // Check if tee time exists
            const existingTeeTime = await this.teeTimeService.getTeeTimeById(id);
            if (!existingTeeTime) {
                return sendFailApiResponse(res, 'Tee time not found');
            }
            const updatedTeeTime = await this.teeTimeService.updateTeeTime(id, data);
            return sendSuccessApiResponse(res, updatedTeeTime);
        }
        catch (error) {
            console.error('Error in updateTeeTime controller:', error);
            return sendErrorApiResponse(res, error, 500);
        }
    }
    /**
     * Delete a tee time by ID
     */
    async deleteTeeTime(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return sendFailApiResponse(res, 'ID is required');
            }
            // Check if tee time exists
            const existingTeeTime = await this.teeTimeService.getTeeTimeById(id);
            if (!existingTeeTime) {
                return sendFailApiResponse(res, 'Tee time not found', [], 404);
            }
            await this.teeTimeService.deleteTeeTime(id);
            return sendSuccessApiResponse(res, null, 204);
        }
        catch (error) {
            console.error('Error in deleteTeeTime controller:', error);
            return sendErrorApiResponse(res, error, 500);
        }
    }
}
//# sourceMappingURL=TeeTimeController.js.map