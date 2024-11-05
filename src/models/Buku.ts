import mongoose, { Schema, Document } from "mongoose";

interface IBook extends Document {
  kodebuku: Number;
  judul: string;
  deskripsi: string;
  tersedia: Boolean;
  pengarang: string;
  harga: Number;
}

const bookSchema: Schema = new Schema(
  {
    kodebuku: { type: Number, require: true, unique: true },
    judul: { type: String, required: true },
    deskripsi: { type: String, require: true },
    tersedia: { type: Boolean, require: true },
    pengarang: { type: String, require: true },
    harga: { type: Number, require: true },
  },
  { timestamps: true }
);

export const Book = mongoose.model<IBook>("Book", bookSchema);
