import blogApi from "api/blogApi";
import React from "react";
import { toast } from "react-toastify";
import AddEditBlogForm from "../../components/AddEditBlogForm";
import "./addeditblog.scss";
type Props = {};

const AddEditBlog = (props: Props) => {
  const handleSubmit = async (values: any) => {
    const myForm: FormData = new FormData();
    console.log(values);

    myForm.append("title", values.title);
    myForm.append("shortDescription", values.shortDescription);
    myForm.append("content", values.content);

    values.images.forEach((image: any) => {
      myForm.append("image", image);
    });

    try {
      await blogApi.add(myForm);
      toast.success("Add blog successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-edit">
      <AddEditBlogForm onSubmit={handleSubmit}></AddEditBlogForm>
    </div>
  );
};

export default AddEditBlog;
