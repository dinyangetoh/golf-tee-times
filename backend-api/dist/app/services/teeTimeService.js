import { scrapeTeeTimesForDate } from '../../libs/teeScraper';
import { generateNamespaceUniqueId } from '../helpers/uuid';
export default class TeeTimeService {
    constructor(teeTimeRepository) {
        this.teeTimeRepository = teeTimeRepository;
    }
    /**
     * Scrape tee times from a golf course website and save them to the database
     */
    async scrapeTeeTimesAndSave(url, date, course) {
        try {
            // First, delete any existing tee times for this date and URL
            await this.teeTimeRepository.deleteByDateAndUrl(date, url);
            // Scrape tee times from the website
            const scrapedTeeTimes = await scrapeTeeTimesForDate(url, date);
            // Map scraped tee times to database format
            const teeTimesToCreate = scrapedTeeTimes.map((teeTime) => ({
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
            console.log('teeTimesToCreate:', teeTimesToCreate);
            // Create tee times in the database
            await this.teeTimeRepository.createMany(teeTimesToCreate);
            // Return the newly created tee times
            return this.teeTimeRepository.findByDate(date);
        }
        catch (error) {
            console.error('Error scraping and saving tee times:', error);
            throw new Error(`Failed to scrape and save tee times: ${error.message}`);
        }
    }
    /**
     * Get all tee times
     */
    async getAllTeeTimes() {
        return this.teeTimeRepository.findAll();
    }
    /**
     * Get all tee times for a specific date
     */
    async getTeeTimesByDate(date) {
        return this.teeTimeRepository.findByDate(date);
    }
    /**
     * Get a tee time by ID
     */
    async getTeeTimeById(id) {
        return this.teeTimeRepository.findById(id);
    }
    /**
     * Create a new tee time
     */
    async createTeeTime(data) {
        return this.teeTimeRepository.create(data);
    }
    /**
     * Update a tee time by ID
     */
    async updateTeeTime(id, data) {
        return this.teeTimeRepository.update(id, data);
    }
    /**
     * Delete a tee time by ID
     */
    async deleteTeeTime(id) {
        return this.teeTimeRepository.delete(id);
    }
    generateTeeTimeId(course, date, teeTime) {
        const { time, holes, price } = teeTime;
        const teeTimeRef = [course.url, date, time, holes, price].join('-').toLowerCase();
        return generateNamespaceUniqueId(teeTimeRef, course.id);
    }
}
//# sourceMappingURL=TeeTimeService.js.map