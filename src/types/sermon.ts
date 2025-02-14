export interface Sermon {
  _id: string;
  title: string;
  preacher: string;
  date: string;
  duration: string;
  audioUrl: string;
  thumbnailUrl: string;
  category: string;
  series?: string;
  description?: string;
  tags?: string[];
}
