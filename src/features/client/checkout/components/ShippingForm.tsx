import { CircularProgress } from "@mui/material";
import { InputField } from "components/form-controls/InputFields";
import { RadioGroupField } from "components/form-controls/RadioGroupField";
import { getBrowserWidth } from "features/client/Home/components/HomeSkeleton";
import { Address } from "models";
import React from "react";
import { useForm } from "react-hook-form";

export interface ShippingFrom {
  name: string;
  address: string;
  phoneNo: string;
  gender: string;
}

type Props = {
  onSubmit: (values: any) => void;
};

const ShippingForm = (props: Props) => {
  const { onSubmit } = props;
  const device = getBrowserWidth();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      address: "",
      phoneNo: "",
      gender: "",
    },
  });

  const handleFormSubmit = async (values: ShippingFrom) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <>
      <div className="shipping-form">
        <div className="form">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="form-group" style={{ margin: "15px 0" }}>
              <label
                style={{ minWidth: "150px", display: "inline-block" }}
                htmlFor="name"
              >
                Name:
              </label>
              <InputField
                mWidth={device === "xs" ? "300px" : "350px"}
                id="name"
                name="name"
                control={control}
                placeholder="Nhập name..."
              ></InputField>
            </div>
            <div className="form-group" style={{ margin: "15px 0" }}>
              <label
                style={{ minWidth: "150px", display: "inline-block" }}
                htmlFor="address"
              >
                Address:
              </label>
              <InputField
                mWidth={device === "xs" ? "300px" : "350px"}
                id="address"
                name="address"
                control={control}
                placeholder="Nhập address..."
              ></InputField>
            </div>
            <div className="form-group" style={{ margin: "15px 0" }}>
              <label
                style={{ minWidth: "150px", display: "inline-block" }}
                htmlFor="phoneNo"
              >
                Phone number:
              </label>
              <InputField
                mWidth={device === "xs" ? "300px" : "350px"}
                id="phoneNo"
                name="phoneNo"
                control={control}
                placeholder="Nhập phoneNo..."
              ></InputField>
            </div>
            {/* <div className="form-group" style={{ margin: "15px 0" }}>
              <div className="radio">
                <span className="male">
                  <span style={{ marginRight: "10px" }}>Male</span>
                  <InputField
                    id="gender"
                    name="gender"
                    value="nam"
                    control={control}
                    type="radio"
                  ></InputField>
                </span>
                <span className="female" style={{ marginLeft: "20px" }}>
                  <span style={{ marginRight: "10px" }}>FeMale</span>
                  <InputField
                    id="gender"
                    name="gender"
                    value="nữ"
                    type="radio"
                    control={control}
                  ></InputField>
                </span>
              </div>
            </div> */}
            <RadioGroupField
              name="gender"
              control={control}
              label="Gender"
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
            />
            <div className="check-out-btn">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <CircularProgress
                    sx={{ color: "#fff" }}
                    size={16}
                  ></CircularProgress>
                ) : (
                  "Check out"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ShippingForm;
