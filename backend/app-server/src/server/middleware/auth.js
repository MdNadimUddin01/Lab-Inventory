"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUSer = authUSer;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = require("../../environment");
function authUSer(req, res, next) {
    const { token } = req.cookies;
    req.userInfo = jsonwebtoken_1.default.verify(token, environment_1.environment.jwtSecret);
    next();
}
