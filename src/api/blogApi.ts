import { ListParams, ListResponse } from "models";
import { Blog } from "models/blog";
import axiosClient from "./axiosClient";

const blogApi = {
  getAll(params: ListParams): Promise<ListResponse<Blog>> {
    const url = "/blogs";
    return axiosClient.get(url, { params });
  },

  getById(id: string): Promise<Blog> {
    const url = `/blog/${id}`;
    return axiosClient.get(url);
  },

  add(data: FormData): Promise<Blog> {
    const url = "/blog/new";
    return axiosClient.post(url, data);
  },

  update(data: Partial<Blog>): Promise<Blog> {
    const url = `/blog/${data._id}`;
    return axiosClient.patch(url, data);
  },

  remove(id: string): Promise<string> {
    const url = `/blog/${id}`;
    return axiosClient.delete(url);
  },
};

export default blogApi;
