export default class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(email, passwordHash) {
        try {
            await this.prisma.user.create({ data: { email, passwordHash } });
            this.prisma.$disconnect();
        }
        catch (error) {
            this.prisma.$disconnect();
            console.error(error);
            throw new Error('data access error');
        }
    }
    async getUser(email) {
        return this.prisma.user.findFirst({ where: { email } });
    }
}
//# sourceMappingURL=UserRepository.js.map