import { Request, Response } from 'express';
import { TeeTimeCreateInput, TeeTimeUpdateInput } from '../entities/TeeTime';
import { Course } from '../entities/Course';
import { sendErrorApiResponse, sendFailApiResponse, sendSuccessApiResponse } from '../helpers/apiResponse';
import TeeTimeService from '../services/TeeTimeService';

export default class TeeTimeController {
    constructor(
        private readonly teeTimeService: TeeTimeService,
        private readonly course: Course,
    ) {}

    /**
     * Scrape tee times from a golf course website and save them to the database
     */
    async scrapeTeeTimesAndSave(req: Request, res: Response): Promise<Response> {
        try {
            let { url, date } = req.body;

            url = url || this.course.url;
            date = date || new Date().toISOString().split('T')[0];

            // Validate date format
            if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
                res.status(400).json({ error: 'Invalid date format. Please use YYYY-MM-DD' });
                return;
            }

            const teeTimes = await this.teeTimeService.scrapeTeeTimesAndSave(url, date, this.course);

            return sendSuccessApiResponse(res, teeTimes);
        } catch (error) {
            console.error('Error in scrapeTeeTimesAndSave controller:', error);
            return sendErrorApiResponse(res, error);
        }
    }

    /**
     * Get all tee times
     */
    async getAllTeeTimes(req: Request, res: Response): Promise<Response> {
        try {
            const teeTimes = await this.teeTimeService.getAllTeeTimes();
            return sendSuccessApiResponse(res, teeTimes);
        } catch (error) {
            console.error('Error in getAllTeeTimes controller:', error);
            sendFailApiResponse(res, error);
        }
    }

    /**
     * Get all tee times for a specific date
     */
    async getTeeTimesByDate(req: Request, res: Response): Promise<Response> {
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
        } catch (error) {
            console.error('Error in getTeeTimesByDate controller:', error);
            return sendErrorApiResponse(res, error);
        }
    }

    /**
     * Get a tee time by ID
     */
    async getTeeTimeById(req: Request, res: Response): Promise<Response> {
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
        } catch (error) {
            console.error('Error in getTeeTimeById controller:', error);
            return sendErrorApiResponse(res, error, 500);
        }
    }

    /**
     * Create a new tee time
     */
    async createTeeTime(req: Request, res: Response): Promise<Response> {
        try {
            const data: TeeTimeCreateInput = req.body;

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
        } catch (error) {
            console.error('Error in createTeeTime controller:', error);
            return sendErrorApiResponse(res, error, 500);
        }
    }

    /**
     * Update a tee time by ID
     */
    async updateTeeTime(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const data: TeeTimeUpdateInput = req.body;

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
        } catch (error) {
            console.error('Error in updateTeeTime controller:', error);
            return sendErrorApiResponse(res, error, 500);
        }
    }

    /**
     * Delete a tee time by ID
     */
    async deleteTeeTime(req: Request, res: Response): Promise<Response> {
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
        } catch (error) {
            console.error('Error in deleteTeeTime controller:', error);
            return sendErrorApiResponse(res, error, 500);
        }
    }
}
