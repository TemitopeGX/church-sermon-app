import { Document } from "mongoose";

export interface Sermon extends Document {
  title: string;
  description: string;
  preacher: string;
  date: string;
  series?: string;
  audioUrl: string;
  thumbnailUrl?: string;
  duration: string;
  views: number;
  totalPlayTime: number;
  completions: number;
  createdAt: Date;
  updatedAt: Date;
}
