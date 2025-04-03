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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermission = void 0;
const checkPermission = (permissionFor, mongodbConnector) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.userInfo;
            console.log("ID ", id);
            const permission = yield mongodbConnector.getDocument("Permition", { userId: id });
            console.log("permission : ", permission);
            next();
        }
        catch (error) {
            return res.status(500).send({
                message: "Internal server error"
            });
        }
    });
};
exports.checkPermission = checkPermission;
