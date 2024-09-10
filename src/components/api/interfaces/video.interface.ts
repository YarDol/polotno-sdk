export interface IVideo {
  id: number;
  file_path: string;
  altText: string;
  title: string;
  description: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  url: string;
  thumbnail_path: string;
  thumbnail_url: string;
}
