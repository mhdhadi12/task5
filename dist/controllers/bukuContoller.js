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
exports.updateBuku = exports.deleteBuku = exports.detailBuku = exports.dataBuku = exports.TambahBuku = void 0;
const Buku_1 = require("../models/Buku");
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const TambahBuku = (Req, Res) => __awaiter(void 0, void 0, void 0, function* () {
    const { judul, deskripsi, tersedia, pengarang, harga } = Req.body;
    try {
        const kodeacakbuku = Math.floor(Math.random() * 700);
        const book = new Buku_1.Book({
            kodebuku: kodeacakbuku,
            judul,
            deskripsi,
            tersedia,
            pengarang,
            harga,
        });
        yield book.save();
        Res.status(200).json((0, apiResponse_1.default)(true, "Buku Berhasil Di Tambahkan", { book }));
    }
    catch (error) {
        const errorMessage = error.message;
        Res.status(500).json((0, apiResponse_1.default)(false, "Gagal Tambahkan Buku", { error: errorMessage }));
    }
});
exports.TambahBuku = TambahBuku;
const dataBuku = (Req, Res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Buku_1.Book.find();
        Res.status(200).json((0, apiResponse_1.default)(true, "Data Buku Tesedia", { book }));
    }
    catch (error) {
        Res.status(500).json((0, apiResponse_1.default)(false, "Data Buku Tidak Tersedia"));
    }
});
exports.dataBuku = dataBuku;
const detailBuku = (Req, Res) => __awaiter(void 0, void 0, void 0, function* () {
    const { kodebuku } = Req.params;
    try {
        const detail = yield Buku_1.Book.findOne({ kodebuku });
        if (!detail) {
            Res.status(404).json((0, apiResponse_1.default)(false, "Data Buku Tidak Ditemukan"));
            return;
        }
        Res.status(200).json((0, apiResponse_1.default)(true, "Detail Data Berhasil", { detail }));
    }
    catch (error) {
        const errorMessage = error.message;
        Res.status(500).json((0, apiResponse_1.default)(false, "Gagal Mendapatkan Detail Buku", {
            error: errorMessage,
        }));
    }
});
exports.detailBuku = detailBuku;
const deleteBuku = (Req, Res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = Req.params;
    try {
        const buku = yield Buku_1.Book.findByIdAndDelete(id);
        Res.status(200).json((0, apiResponse_1.default)(true, "Buku Berhasil Di Hapus", { buku }));
    }
    catch (error) {
        const errorMessage = error.message;
        Res.status(500).json((0, apiResponse_1.default)(false, "Gagal Mendapatkan Detail Buku", {
            error: errorMessage,
        }));
    }
});
exports.deleteBuku = deleteBuku;
const updateBuku = (Req, Res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = Req.params;
    try {
        const update = yield Buku_1.Book.findByIdAndUpdate(id, Req.body, { new: true });
        if (!update) {
            Res.status(404).json((0, apiResponse_1.default)(false, "Buku Tidak Ditemukan"));
        }
        Res.status(200).json((0, apiResponse_1.default)(true, "Data Berhasil Di Update", { update }));
    }
    catch (error) {
        Res.status(500).json((0, apiResponse_1.default)(false, "Gagal Update Buku"));
    }
});
exports.updateBuku = updateBuku;
