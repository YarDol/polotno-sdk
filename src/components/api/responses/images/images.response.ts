import { IImage } from "../../interfaces/image.interface";

export interface ImagesResponse {
  data: IImage[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}
