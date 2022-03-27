import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";
import { CircularProgress } from "@mui/material";
import { InputField } from "components/form-controls/InputFields";
import "draft-js/dist/Draft.css";
import { Images, Product } from "models";
import { Blog } from "models/blog";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

type Props = {
  onSubmit?: (values: FormData) => void;
  init?: any;
};

const AddEditBlogForm = (props: Props) => {
  const { onSubmit, init } = props;
  const [images, setImages] = useState<any>();
  const [imagesPreview, setImagesPreview] = useState<any>([]);
  const [dataCkediter, setDataCkediter] = useState<any>();
  const { id } = useParams();

  const initialValues = {
    title: "",
    shortDescription: "",
  } as Blog;

  const values = Boolean(id) ? init : initialValues;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm({
    defaultValues: values,
  });

  useEffect(() => {
    if (!id && images?.length === 0) {
      setValue("name", "");
      setValue("description", "");
      setValue("category", "");
      setValue("price", 0);
      setValue("discount", 0);
      setValue("weight", 0);
      setValue("stock", 0);
      setImagesPreview([]);
      setImages([]);
    }
    if (init) {
      setDataCkediter(init.description);
    }
  }, [id]);

  const createBlogImagesChange = (e: any) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file: any) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old: any) => [...old, reader.result]);
          setImages((old: any) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFormSubmit = async (values: any) => {
    values.images = images;
    values.content = dataCkediter;

    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <div className="add-edit__form">
      <h3 className="add-edit__form-heading">
        {Boolean(id) ? "Edit product" : "Add product"}
      </h3>
      <div className="add-edit__form-content">
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="add-edit__form-form-group">
            <label htmlFor="name">Title</label>
            <InputField
              id="title"
              name="title"
              control={control}
              placeholder="Nhập title..."
            ></InputField>
          </div>
          <div className="add-edit__form-form-group">
            <label htmlFor="shortDescription">Short Desc</label>
            <InputField
              id="shortDescription"
              name="shortDescription"
              control={control}
              placeholder="Nhập shortDescription..."
            ></InputField>
          </div>
          <div className="add-edit__form-form-group">
            <label htmlFor="shortDescription">Content</label>
            <CKEditor
              editor={ClassicEditor}
              data={(init && init?.content) || ""}
              onInit={(editor: any) => {
                // You can store the "editor" and use when it is needed.
                // if (init) setDataCkediter(init.description);
              }}
              onChange={(event: any, editor: any) => {
                const data = editor.getData();
                setDataCkediter(data);
              }}
            />
          </div>
          <div className="add-edit__form-form-group">
            <label htmlFor="images">Image</label>
            <input
              type="file"
              onChange={createBlogImagesChange}
              name="images"
            />
          </div>

          <div className="add-edit__form-form-group">
            <button disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <CircularProgress
                  size={16}
                  sx={{ color: "#fff" }}
                ></CircularProgress>
              ) : Boolean(id) ? (
                "Edit Blog"
              ) : (
                "Add Blog"
              )}
            </button>
          </div>
        </form>
        <div>
          {id &&
            init?.images.map((item: Images, index: number) => (
              <img key={index} src={item.url} alt="Product Preview" />
            ))}

          {imagesPreview &&
            imagesPreview.map((item: string, index: number) => (
              <img key={index} src={item} alt="Product Preview" />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AddEditBlogForm;
