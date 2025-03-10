import bcrypt from 'bcrypt';
async function hashPassword(password) {
    return bcrypt.hash(password, 12);
}
async function comparePassword(password, userPasswordHash) {
    return bcrypt.compare(password, userPasswordHash);
}
export { hashPassword, comparePassword };
//# sourceMappingURL=password.helper.js.map