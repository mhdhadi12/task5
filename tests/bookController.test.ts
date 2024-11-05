import { Request, Response, NextFunction } from "express";
import {
  TambahBuku,
  dataBuku,
  detailBuku,
  deleteBuku,
  updateBuku,
} from "../src/controllers/bookContoller";
import { Book } from "../src/models/Buku";
import apiResponse from "../src/utils/apiResponse";

describe("Buku Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let json: jest.Mock;
  let status: jest.Mock;

  beforeEach(() => {
    json = jest.fn();
    status = jest.fn().mockReturnValue({ json });
    mockResponse = { status } as Partial<Response>;
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add a new book", async () => {
    mockRequest = {
      body: {
        judul: "Test Book",
        deskripsi: "Description",
        tersedia: true,
        pengarang: "Author",
        harga: 100,
      },
    } as Partial<Request>;

    const mockBook = {
      kodebuku: 123,
      judul: "Test Book",
      deskripsi: "Description",
      tersedia: true,
      pengarang: "Author",
      harga: 100,
    };

    jest.spyOn(Book.prototype, "save").mockResolvedValue(mockBook);

    await TambahBuku(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(
      apiResponse(true, "Buku Berhasil Di Tambahkan", { book: mockBook })
    );
  });

  it("should fetch all books", async () => {
    const mockBookList = [{ kodebuku: 123, judul: "Test Book" }];
    jest.spyOn(Book, "find").mockResolvedValue(mockBookList);

    await dataBuku(mockRequest as Request, mockResponse as Response, mockNext);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(
      apiResponse(true, "Data Buku Tersedia", { book: mockBookList })
    );
  });

  it("should fetch details of a specific book", async () => {
    mockRequest = { params: { kodebuku: "123" } } as Partial<Request>;
    const mockBookDetail = { kodebuku: 123, judul: "Test Book" };
    jest.spyOn(Book, "findOne").mockResolvedValue(mockBookDetail);

    await detailBuku(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(
      apiResponse(true, "Detail Data Berhasil", { detail: mockBookDetail })
    );
  });

  it("should delete a book", async () => {
    mockRequest = { params: { id: "123" } } as Partial<Request>;
    const mockBook = { kodebuku: 123, judul: "Test Book" };
    jest.spyOn(Book, "findByIdAndDelete").mockResolvedValue(mockBook);

    await deleteBuku(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(
      apiResponse(true, "Buku Berhasil Di Hapus", { buku: mockBook })
    );
  });

  it("should update a book", async () => {
    mockRequest = {
      params: { id: "123" },
      body: { judul: "Updated Test Book" },
    } as Partial<Request>;

    const mockUpdate = { kodebuku: 123, judul: "Updated Test Book" };
    jest.spyOn(Book, "findByIdAndUpdate").mockResolvedValue(mockUpdate);

    await updateBuku(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(
      apiResponse(true, "Data Berhasil Di Update", { update: mockUpdate })
    );
  });
});
