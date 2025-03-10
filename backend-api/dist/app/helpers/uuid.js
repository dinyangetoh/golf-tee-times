import { v4 as uuidV4, v5 as uuidV5 } from 'uuid';
export function generateNamespaceUniqueId(text, namespace, prefix) {
    const uuid = uuidV5(text, namespace);
    if (prefix) {
        return `${prefix}-${uuid}`;
    }
    return uuid;
}
export function generateUniqueId() {
    return uuidV4();
}
export default { uuidV4, uuidV5 };
//# sourceMappingURL=uuid.js.map