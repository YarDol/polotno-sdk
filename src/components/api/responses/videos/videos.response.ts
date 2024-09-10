import { IVideo } from "../../interfaces/video.interface";

export interface VideosResponse {
  data: IVideo[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}
