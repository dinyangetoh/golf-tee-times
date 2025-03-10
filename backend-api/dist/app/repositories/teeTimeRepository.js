export default class TeeTimeRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    /**
     * Create a new tee time
     */
    async create(data) {
        return this.prisma.teeTime.create({
            data,
        });
    }
    /**
     * Create multiple tee times at once
     */
    async createMany(data) {
        const result = await this.prisma.teeTime.createMany({
            data,
        });
        return result.count;
    }
    /**
     * Get all tee times
     */
    async findAll() {
        return this.prisma.teeTime.findMany();
    }
    /**
     * Get all tee times for a specific date
     */
    async findByDate(date) {
        return this.prisma.teeTime.findMany({
            where: {
                date,
            },
            orderBy: {
                time: 'asc',
            },
        });
    }
    /**
     * Get a tee time by ID
     */
    async findById(id) {
        return this.prisma.teeTime.findUnique({
            where: {
                id,
            },
        });
    }
    /**
     * Update a tee time by ID
     */
    async update(id, data) {
        return this.prisma.teeTime.update({
            where: {
                id,
            },
            data,
        });
    }
    /**
     * Delete a tee time by ID
     */
    async delete(id) {
        return this.prisma.teeTime.delete({
            where: {
                id,
            },
        });
    }
    /**
     * Delete all tee times for a specific date and course URL
     */
    async deleteByDateAndUrl(date, courseUrl) {
        const result = await this.prisma.teeTime.deleteMany({
            where: {
                date,
                courseUrl,
            },
        });
        return result.count;
    }
}
//# sourceMappingURL=TeeTimeRepository.js.map