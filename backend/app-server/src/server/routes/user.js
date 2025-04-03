"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = user;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = require("../../environment");
function user(router, mongodbConnector) {
    router.post("/signup", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { name, email, password, role, phoneNumber } = req.body;
        if (!name || !email || !password || !role || !phoneNumber) {
            return res.status(400).send("Wrong Credentilas");
        }
        try {
            const result = yield mongodbConnector.getDocument("User", { email });
            if (result) {
                return res.status(409).send("User already exist");
            }
            const hashedPassword = bcrypt_1.default.hashSync(password, 10);
            const user = yield mongodbConnector.createDcoument("User", {
                name: name,
                email: email,
                password: hashedPassword,
                role: role,
                phoneNumber: phoneNumber,
            });
            const userId = user.insertedId;
            const flag = role === "Admin";
            const permition = yield mongodbConnector.createDcoument("Permition", {
                userId,
                canAddInstrument: flag,
                canEditInstrument: flag,
                issueAnInstrument: flag,
                requestForIssue: !flag,
                canDeleteInstrument: flag,
            });
            // console.log("USER : ", user);
            res.status(200).send({
                message: `User Signup sucessfully as ${role}`,
                user,
            });
        }
        catch (error) {
            return res.status(500).send({
                message: "User Creation Failed",
            });
        }
    }));
    router.post("/login", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const user = yield mongodbConnector.getDocument("User", { email: email });
            // console.log(user);
            if (!user) {
                return res
                    .status(404)
                    .send("User not registered. Please sign up to create an account.");
            }
            const match = bcrypt_1.default.compareSync(password, user.password);
            if (!match) {
                return res.status(401).send("Invalid Password");
            }
            const payload = {
                email,
                id: user._id
            };
            const token = jsonwebtoken_1.default.sign(payload, environment_1.environment.jwtSecret, { expiresIn: "24h" });
            return res.cookie("token", token).status(200).send({
                message: "Login successful. Welcome back!",
                user,
            });
        }
        catch (error) {
            return res.status(501).send("Internal serval error");
        }
    }));
}
