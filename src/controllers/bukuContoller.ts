import { Request, Response, RequestHandler } from "express";
import { Book } from "../models/Buku";
import apiResponse from "../utils/apiResponse";

export const TambahBuku: RequestHandler = async (
  Req: Request,
  Res: Response
): Promise<void> => {
  const { judul, deskripsi, tersedia, pengarang, harga } = Req.body;
  try {
    const kodeacakbuku = Math.floor(Math.random() * 700);

    const book = new Book({
      kodebuku: kodeacakbuku,
      judul,
      deskripsi,
      tersedia,
      pengarang,
      harga,
    });

    await book.save();
    Res.status(200).json(
      apiResponse(true, "Buku Berhasil Di Tambahkan", { book })
    );
  } catch (error) {
    const errorMessage = (error as Error).message;
    Res.status(500).json(
      apiResponse(false, "Gagal Tambahkan Buku", { error: errorMessage })
    );
  }
};

export const dataBuku = async (Req: Request, Res: Response): Promise<void> => {
  try {
    const book = await Book.find();
    Res.status(200).json(apiResponse(true, "Data Buku Tesedia", { book }));
  } catch (error) {
    Res.status(500).json(apiResponse(false, "Data Buku Tidak Tersedia"));
  }
};

export const detailBuku = async (
  Req: Request,
  Res: Response
): Promise<void> => {
  const { kodebuku } = Req.params;

  try {
    const detail = await Book.findOne({ kodebuku });
    if (!detail) {
      Res.status(404).json(apiResponse(false, "Data Buku Tidak Ditemukan"));
      return;
    }
    Res.status(200).json(apiResponse(true, "Detail Data Berhasil", { detail }));
  } catch (error) {
    const errorMessage = (error as Error).message;
    Res.status(500).json(
      apiResponse(false, "Gagal Mendapatkan Detail Buku", {
        error: errorMessage,
      })
    );
  }
};

export const deleteBuku = async (
  Req: Request,
  Res: Response
): Promise<void> => {
  const { id } = Req.params;
  try {
    const buku = await Book.findByIdAndDelete(id);

    Res.status(200).json(apiResponse(true, "Buku Berhasil Di Hapus", { buku }));
  } catch (error) {
    const errorMessage = (error as Error).message;
    Res.status(500).json(
      apiResponse(false, "Gagal Mendapatkan Detail Buku", {
        error: errorMessage,
      })
    );
  }
};

export const updateBuku = async (
  Req: Request,
  Res: Response
): Promise<void> => {
  const { id } = Req.params;
  try {
    const update = await Book.findByIdAndUpdate(id, Req.body, { new: true });

    if (!update) {
      Res.status(404).json(apiResponse(false, "Buku Tidak Ditemukan"));
    }

    Res.status(200).json(
      apiResponse(true, "Data Berhasil Di Update", { update })
    );
  } catch (error) {
    Res.status(500).json(apiResponse(false, "Gagal Update Buku"));
  }
};
