import { InputField } from "components/form-controls/InputFields";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {
  device: string;
};

const ContactForm = (props: Props) => {
  const { device } = props;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      content: "",
    },
  });

  return (
    <div className="contact-page__form">
      <h4 className="contact-page__form-heading">Send us your questions</h4>
      <form>
        <div className="contact-page__form-form-group">
          <InputField
            name="name"
            control={control}
            placeholder="Your name"
            mWidth={device === "xs" ? 350 : 500}
          ></InputField>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: device === "xs" ? "column" : "row",
          }}
        >
          <div className="contact-page__form-form-group">
            <InputField
              name="email"
              control={control}
              placeholder="Your email"
              mWidth={device === "xs" ? 350 : 245}
            ></InputField>
          </div>
          <div
            className={`contact-page__form-form-group ${
              device === "xs" ? "" : "ml-10"
            }`}
          >
            <InputField
              name="phoneNumber"
              control={control}
              placeholder="Your phone number"
              mWidth={device === "xs" ? 350 : 245}
            ></InputField>
          </div>
        </div>
        <div className="contact-page__form-form-group">
          <InputField
            name="content"
            mWidth={device === "xs" ? 350 : 500}
            control={control}
            placeholder="Your content"
            mHeight={150}
          ></InputField>
        </div>
        <div className="contact-page__form-form-group">
          <button>Send</button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
