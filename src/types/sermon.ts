export interface Sermon {
  _id?: string;
  title: string;
  description: string;
  preacher: string;
  date: string;
  series?: string;
  audioUrl: string;
  thumbnailUrl?: string;
  duration: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}
