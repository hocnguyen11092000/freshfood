import { Images } from "./product";

export interface Blog {
  _id: string;
  title: string;
  shortDescription: string;
  content: string;
  image: Images;
  author?: string;
  createdAt?: any;
  blogCount?: number;
  [key: string]: any;
}
