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
exports.Login = exports.registerUser = void 0;
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecret';
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const cekEmail = yield User_1.User.findOne({ email });
        if (cekEmail) {
            res.status(401).json((0, apiResponse_1.default)(false, 'Email Sudah Terdaftar'));
        }
        const hashPw = yield bcryptjs_1.default.hash(password, 17);
        const user = new User_1.User({
            username,
            email,
            password: hashPw,
        });
        yield user.save();
        res.status(201).json((0, apiResponse_1.default)(true, 'Registrasi Berhasil, Silahkan Login'));
    }
    catch (error) {
        res.status(500).json((0, apiResponse_1.default)(false, 'Registrasi Gagal !!'));
    }
});
exports.registerUser = registerUser;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const users = yield User_1.User.findOne({ email });
        if (!users) {
            res.status(401).json((0, apiResponse_1.default)(false, 'Email Tidak Ditemukan'));
            return;
        }
        const checkPw = yield bcryptjs_1.default.compare(password, users.password);
        if (!checkPw) {
            res.status(400).json((0, apiResponse_1.default)(false, 'Password Salah'));
            return;
        }
        const payload = { userId: users.id };
        const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json((0, apiResponse_1.default)(true, 'Login Berhasil', { token }));
    }
    catch (error) {
        console.error(error);
        res.status(500).json((0, apiResponse_1.default)(false, 'Login Gagal !!'));
    }
});
exports.Login = Login;
