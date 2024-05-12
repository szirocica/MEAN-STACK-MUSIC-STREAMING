import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IAlbum extends Document {
  name: string;
  description: string;
  books?: Array<Types.ObjectId>;
  users?: Array<Types.ObjectId>;
}

// Album Schema
const albumSchema: Schema<IAlbum> = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  books: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: false },
  ],
  users: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  ],
});

export const Album: Model<IAlbum> = mongoose.model("Club", albumSchema);