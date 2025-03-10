import { TeeTime } from '@prisma/client';
import { TeeTimeCreateInput, TeeTimeUpdateInput } from '../entities/TeeTime';
import { ScrapedTeeTime, scrapeTeeTimesForDate } from '../../libs/teeScraper';
import { generateNamespaceUniqueId } from '../helpers/uuid';
import { Course } from '../entities/Course';
import TeeTimeRepository from '../repositories/TeeTimeRepository';

export default class TeeTimeService {
    constructor(private readonly teeTimeRepository: TeeTimeRepository) {}

    /**
     * Scrape tee times from a golf course website and save them to the database
     */
    async scrapeTeeTimesAndSave(url: string, date: string, course: Course): Promise<TeeTime[]> {
        try {
            // First, delete any existing tee times for this date and URL
            await this.teeTimeRepository.deleteByDateAndUrl(date, url);

            // Scrape tee times from the website
            const scrapedTeeTimes = await scrapeTeeTimesForDate(url, date);

            // Map scraped tee times to database format
            const teeTimesToCreate: TeeTimeCreateInput[] = scrapedTeeTimes.map((teeTime) => ({
                id: this.generateTeeTimeId(course, date, teeTime),
                time: teeTime.time,
                price: teeTime.price,
                min_players: teeTime.min_players,
                max_players: teeTime.max_players,
                holes: teeTime.holes,
                golfCourseName: course.name,
                courseUrl: url,
                date: date,
            }));

            // Create tee times in the database
            await this.teeTimeRepository.createMany(teeTimesToCreate);

            // Return the newly created tee times
            return this.teeTimeRepository.findByDate(date);
        } catch (error) {
            console.error('Error scraping and saving tee times:', error);
            throw new Error(`Failed to scrape and save tee times: ${error.message}`);
        }
    }

    /**
     * Get all tee times
     */
    async getAllTeeTimes(): Promise<TeeTime[]> {
        return this.teeTimeRepository.findAll();
    }

    /**
     * Get all tee times for a specific date
     */
    async getTeeTimesByDate(date: string): Promise<TeeTime[]> {
        return this.teeTimeRepository.findByDate(date);
    }

    /**
     * Get a tee time by ID
     */
    async getTeeTimeById(id: string): Promise<TeeTime | null> {
        return this.teeTimeRepository.findById(id);
    }

    /**
     * Create a new tee time
     */
    async createTeeTime(data: TeeTimeCreateInput): Promise<TeeTime> {
        return this.teeTimeRepository.create(data);
    }

    /**
     * Update a tee time by ID
     */
    async updateTeeTime(id: string, data: TeeTimeUpdateInput): Promise<TeeTime> {
        return this.teeTimeRepository.update(id, data);
    }

    /**
     * Delete a tee time by ID
     */
    async deleteTeeTime(id: string): Promise<TeeTime> {
        return this.teeTimeRepository.delete(id);
    }

    private generateTeeTimeId(course: Course, date: string, teeTime: ScrapedTeeTime): string {
        const { time, holes, price } = teeTime;
        const teeTimeRef = [course.url, date, time, holes, price].join('-').toLowerCase();

        return generateNamespaceUniqueId(teeTimeRef, course.id);
    }
}
