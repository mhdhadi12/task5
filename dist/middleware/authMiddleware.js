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
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
            // Verifikasi token
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            // User Berdasarkan Id
            req.user = yield User_1.User.findById(decoded.userId).select('-password');
            if (!req.user) {
                res.status(401).json((0, apiResponse_1.default)(false, 'Maaf, User Tidak Di Temukan', { decoded }));
                return;
            }
            console.log(req.user);
            next();
        }
        else {
            res.status(401).json((0, apiResponse_1.default)(false, 'Maaf, Fitur Ini Tidak Bisa Di akses,  Login Terlebih Dahulu'));
        }
    }
    catch (error) {
        res.status(401).json((0, apiResponse_1.default)(false, 'Maaf, Fitur Ini Tidak Bisa Di akses, Login Terlebih Dahulu'));
    }
});
exports.protect = protect;
