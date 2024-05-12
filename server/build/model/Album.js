"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Album = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Album Schema
const albumSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    books: [
        { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Book", required: false },
    ],
    users: [
        { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: false },
    ],
});
exports.Album = mongoose_1.default.model("Club", albumSchema);
