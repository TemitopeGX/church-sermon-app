import { Document, Model } from "mongoose";

declare module "mongoose" {
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

  interface SermonModel extends Model<ISermon> {}
}
