"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Music = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Book Schema
const musicSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    clubs: [
        { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Club", required: false },
    ],
});
exports.Music = mongoose_1.default.model("Music", musicSchema);
