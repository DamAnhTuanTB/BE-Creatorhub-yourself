"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.encodePassword = void 0;
const bcrypt = require("bcrypt");
function encodePassword(rawPassword) {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword, SALT);
}
exports.encodePassword = encodePassword;
function comparePassword(rawPassword, hash) {
    return bcrypt.compareSync(rawPassword, hash);
}
exports.comparePassword = comparePassword;
//# sourceMappingURL=bcrypt.js.map