import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress } from "@mui/material";
import userApi from "api/userApi";
import { useAppSelector } from "app/hooks";
import { InputField } from "components/form-controls/InputFields";
import { Values } from "models";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

type Props = {
  onSubmit: (values: Values) => void;
};

const handleShowForgotPassword = (toggleRef: any, contentRef: any) => {
  document.addEventListener("mousedown", (e: any) => {
    if (toggleRef?.current && toggleRef.current.contains(e.target)) {
      contentRef.current.classList.toggle("active");
    } else {
      if (contentRef.current && !contentRef.current.contains(e.target)) {
        contentRef.current.classList.remove("active");
      }
    }
  });
};

const LoginForm = (props: Props) => {
  const [emailForgot, setEmailForgot] = useState<string>("");
  const isLoading = useAppSelector((state) => state.auth.logging);
  const [loadingForgot, setLoadingForgot] = useState<boolean>(false);
  const { onSubmit } = props;
  const toggleRef = useRef<any>(null);
  const contentRef = useRef<any>(null);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Please enter your email.")
      .email("Please enter a valid email address."),
    password: yup
      .string()
      .required("Please enter your password")
      .min(8, "Please enter at least 8 characters."),
  });

  handleShowForgotPassword(toggleRef, contentRef);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (values: Values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const handleForgotPassword = async () => {
    setLoadingForgot(true);
    try {
      await userApi.forgotPassword(emailForgot);
      setLoadingForgot(false);
      toast.success("Successfully, please check your email");

      if (contentRef.current) {
        contentRef.current.classList.remove("active");
      }
    } catch (error) {
      setLoadingForgot(false);
      toast.error("Fail");
    }
  };

  return (
    <>
      <div className="login-form">
        <div className="login-form__title">
          <h3>LOGIN</h3>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <InputField
                id="email"
                name="email"
                control={control}
                placeholder="Nhập email..."
              ></InputField>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <InputField
                id="password"
                name="password"
                control={control}
                placeholder="Nhập password"
                type="password"
              ></InputField>
            </div>
            <div className="form-group">
              <span className="forgot" ref={toggleRef}>
                Forgot your password ?
              </span>
            </div>
            <div className="form-group">
              <span className="forgot">
                Don't have an account
                <span>
                  <Link to="/register">
                    <span style={{ marginLeft: "15px", fontWeight: "bold" }}>
                      Register here
                    </span>
                  </Link>
                </span>
              </span>
            </div>
            <div className="form-group">
              <button disabled={isLoading} type="submit">
                {(isLoading && (
                  <CircularProgress size={16} sx={{ color: "#fff" }} />
                )) ||
                  "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="forgot-form" ref={contentRef}>
        <div className="forgot__form">
          <input
            type="text"
            placeholder="Nhập email..."
            onChange={(e) => setEmailForgot(e.target.value)}
          />
          <div>
            <button
              type="submit"
              onClick={handleForgotPassword}
              disabled={loadingForgot}
            >
              {(loadingForgot && (
                <CircularProgress size={16} sx={{ color: "#fff" }} />
              )) ||
                "Submit"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
