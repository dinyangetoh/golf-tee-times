import { PrismaClient, TeeTime } from '@prisma/client';
import { TeeTimeCreateInput, TeeTimeUpdateInput } from '../entities/TeeTime';

export default class TeeTimeRepository {
    constructor(private readonly prisma: PrismaClient) {}
    /**
     * Create a new tee time
     */
    async create(data: TeeTimeCreateInput): Promise<TeeTime> {
        return this.prisma.teeTime.create({
            data,
        });
    }

    /**
     * Create multiple tee times at once
     */
    async createMany(data: TeeTimeCreateInput[]): Promise<number> {
        const result = await this.prisma.teeTime.createMany({
            data,
        });
        return result.count;
    }

    /**
     * Get all tee times
     */
    async findAll(): Promise<TeeTime[]> {
        return this.prisma.teeTime.findMany({
            orderBy: {
                date: 'asc',
            },
        });
    }

    /**
     * Get all tee times for a specific date
     */
    async findByDate(date: string): Promise<TeeTime[]> {
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
    async findById(id: string): Promise<TeeTime | null> {
        return this.prisma.teeTime.findUnique({
            where: {
                id,
            },
        });
    }

    /**
     * Update a tee time by ID
     */
    async update(id: string, data: TeeTimeUpdateInput): Promise<TeeTime> {
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
    async delete(id: string): Promise<TeeTime> {
        return this.prisma.teeTime.delete({
            where: {
                id,
            },
        });
    }

    /**
     * Delete all tee times for a specific date and course URL
     */
    async deleteByDateAndUrl(date: string, courseUrl: string): Promise<number> {
        const result = await this.prisma.teeTime.deleteMany({
            where: {
                date,
                courseUrl,
            },
        });
        return result.count;
    }
}
