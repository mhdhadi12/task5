"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bukuContoller_1 = require("../controllers/bukuContoller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const routerBuku = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Buku
 *   description: Manajemen data buku
 */
/**
 * @swagger
 * /api/buku/data:
 *   get:
 *     summary: Dapatkan daftar semua buku
 *     tags: [Buku]
 *     responses:
 *       200:
 *         description: Daftar buku berhasil diambil
 */
routerBuku.get('/data', bukuContoller_1.dataBuku);
/**
 * @swagger
 * /api/buku/data/{id}:
 *   get:
 *     summary: Dapatkan detail buku berdasarkan ID
 *     tags: [Buku]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID buku
 *     responses:
 *       200:
 *         description: Detail buku berhasil diambil
 *       404:
 *         description: Buku tidak ditemukan
 */
routerBuku.get('/data/:kodebuku', bukuContoller_1.detailBuku);
/**
 * @swagger
 * /api/buku/tambah:
 *   post:
 *     summary: Tambah buku baru
 *     tags: [Buku]
 *     security:
 *       - bearerAuth: []  # Menggunakan skema keamanan JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               kodebuku:
 *                 type: number
 *               judul:
 *                 type: string
 *               deskripsi:
 *                 type: string
 *               tersedia:
 *                 type: boolean
 *               pengarang:
 *                 type: string
 *               harga:
 *                 type: number
 *     responses:
 *       201:
 *         description: Buku berhasil ditambahkan
 *       401:
 *         description: Token tidak valid atau tidak ada
 */
routerBuku.post('/tambah', authMiddleware_1.protect, bukuContoller_1.TambahBuku);
/**
 * @swagger
 * /api/buku/data/{id}:
 *   put:
 *     summary: Update buku berdasarkan ID
 *     tags: [Buku]
 *     security:
 *       - bearerAuth: []  # Menggunakan skema keamanan JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID buku
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               kodebuku:
 *                 type: number
 *               judul:
 *                 type: string
 *               deskripsi:
 *                 type: string
 *               tersedia:
 *                 type: boolean
 *               pengarang:
 *                 type: string
 *               harga:
 *                 type: number
 *     responses:
 *       200:
 *         description: Buku berhasil diperbarui
 *       404:
 *         description: Buku tidak ditemukan
 *       401:
 *         description: Token tidak valid atau tidak ada
 */
routerBuku.put('/data/:id', authMiddleware_1.protect, bukuContoller_1.updateBuku);
/**
 * @swagger
 * /api/buku/data/{id}:
 *   delete:
 *     summary: Hapus buku berdasarkan ID
 *     tags: [Buku]
 *     security:
 *       - bearerAuth: []  # Menggunakan skema keamanan JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID buku
 *     responses:
 *       200:
 *         description: Buku berhasil dihapus
 *       404:
 *         description: Buku tidak ditemukan
 *       401:
 *         description: Token tidak valid atau tidak ada
 */
routerBuku.delete('/data/:id', authMiddleware_1.protect, bukuContoller_1.deleteBuku);
exports.default = routerBuku;
