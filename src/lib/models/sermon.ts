import mongoose, { Schema, Document } from "mongoose";

interface ISermon extends Document {
  title: string;
  preacher: string;
  date: Date;
  duration: string;
  audioUrl: string;
  thumbnailUrl: string;
  category: string;
  series: string;
  description: string;
  tags: string[];
}

const SermonSchema = new Schema<ISermon>(
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

export default mongoose.models.Sermon ||
  mongoose.model<ISermon>("Sermon", SermonSchema);
