import mongoose from "mongoose";

const SermonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    preacher: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: String, required: true },
    audioUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    category: { type: String, required: true },
    series: { type: String },
    description: { type: String },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

export const Sermon =
  mongoose.models.Sermon || mongoose.model("Sermon", SermonSchema);
