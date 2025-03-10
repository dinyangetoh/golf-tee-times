import AppService from './app/services/AppService';
import { PrismaClient } from '@prisma/client';
import TeeTimeController from './app/controllers/TeeTimeController';
import TeeTimeRepository from './app/repositories/TeeTimeRepository';
import TeeTimeService from './app/services/TeeTimeService';
export const appService = new AppService();
const prisma = new PrismaClient();
const course = {
    id: '84404520-6ee4-4589-a7e3-dd00041133a8',
    name: 'Commonground Golf Course',
    url: 'https://commonground-golf-course.book.teeitup.com/',
};
const teeTimeRepository = new TeeTimeRepository(prisma);
export const teeTimeService = new TeeTimeService(teeTimeRepository);
export const teeTimeController = new TeeTimeController(teeTimeService, course);
//# sourceMappingURL=assembly.js.map