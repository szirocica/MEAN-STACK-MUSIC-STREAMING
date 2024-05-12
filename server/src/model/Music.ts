import mongoose, { Document, Model, Schema, Types } from "mongoose";

interface IMusic extends Document {
  title: string;
  author: string;
  clubs?: Array<Types.ObjectId>;
}

// Book Schema
const musicSchema: Schema<IMusic> = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  clubs: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Club", required: false },
  ],
});

export const Music: Model<IMusic> = mongoose.model("Music", musicSchema);