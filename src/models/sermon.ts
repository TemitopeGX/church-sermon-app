import mongoose, { Schema } from "mongoose";
import { Sermon } from "@/types/sermon";

const SermonSchema = new Schema<Sermon>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    preacher: { type: String, required: true },
    date: { type: String, required: true },
    series: { type: String },
    audioUrl: { type: String, required: true },
    thumbnailUrl: { type: String },
    duration: { type: String, required: true },
    views: { type: Number, default: 0 },
    totalPlayTime: { type: Number, default: 0 },
    completions: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Sermon ||
  mongoose.model<Sermon>("Sermon", SermonSchema);
