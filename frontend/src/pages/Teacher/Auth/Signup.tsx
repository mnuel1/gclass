import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authapi } from "../../../process/axios";
// import { Authentication } from "../../../Auth/Authentication";
import { Spinner } from "../../../components/Spinner/spinner";
import useModalStore from "../../../process/Modal/useModalStore";
import { FailedToast } from "../../../components/Toast/FailedToast";
import { SuccessToast } from "../../../components/Toast/SuccessToast";

interface FormState {
  first_name: string;
  middle_name: string;
  last_name: string;
  email_address: string;
  password: string;
  confirm_password: string;
}

interface ErrorsState {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
}

export const TeacherSignup: React.FC = () => {
  // const { login } = Authentication()
  const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useModalStore();

  const [form, setForm] = useState<FormState>({
    first_name: "",
    middle_name: "",
    last_name: "",
    email_address: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState<ErrorsState>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (form.first_name.length <= 0) {
      newErrors.first_name = "First Name is required.";
    }

    if (form.last_name.length <= 0) {
      newErrors.last_name = "Last Name is required.";
    }

    if (!form.email_address.includes("@")) {
      newErrors.email = "Please enter a valid email address.";
    }
    const password = form.password;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    } else if (!hasUpperCase) {
      newErrors.password =
        "Password must contain at least one uppercase letter.";
    } else if (!hasLowerCase) {
      newErrors.password =
        "Password must contain at least one lowercase letter.";
    } else if (!hasSpecialChar) {
      newErrors.password =
        "Password must contain at least one special character.";
    }
    if (
      form.password !== form.confirm_password ||
      form.confirm_password.length <= 0
    ) {
      newErrors.confirm_password = "Passwords do not match.";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      startLoading();
      const response = await authapi.post("/teacher/register", form);

      if (response.status === 201) {
        FailedToast(
          "Email already have an account. Please use different email account."
        );
        stopLoading();
        return;
      }

      if (response.status !== 200) {
        FailedToast("Creating an account failed. Something went wrong!");
        stopLoading();
        return;
      }
      SuccessToast(
        "You have successfully created your account. Please wait for the admin to approve your account. We will send an email regarding to your application"
      );
      stopLoading();
      navigate(`/teacher/signup`);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <Spinner isLoading={isLoading}>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-center text-2xl font-bold text-blue-600 sm:text-3xl">
              Join the Teacher Portal
            </h1>

            <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
              Sign up to access teaching resources, manage your classes, and
              connect with your students. Complete the form below to get
              started.
            </p>

            <form
              action="#"
              className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
              onSubmit={handleSubmit}
            >
              <p className="text-center text-lg font-medium">
                Sign up for an account
              </p>

              <div className="flex flex-col md:flex-row gap-6 ">
                <div>
                  <label htmlFor="first_name" className="sr-only">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    className="border w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter first name"
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-sm">{errors.first_name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="middle_name" className="sr-only">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    name="middle_name"
                    value={form.middle_name}
                    onChange={handleChange}
                    className="border w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter middle name"
                  />
                </div>
                <div>
                  <label htmlFor="last_name" className="sr-only">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    className="border w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter last name"
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-sm">{errors.last_name}</p>
                  )}
                </div>
              </div>
              <div className="border-b border-gray-200" />
              <div>
                <label htmlFor="email_address" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="email_address"
                  value={form.email_address}
                  onChange={handleChange}
                  className="border w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="border w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirm_password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  value={form.confirm_password}
                  onChange={handleChange}
                  className="border w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Confirm password"
                />
                {errors.confirm_password && (
                  <p className="text-red-500 text-sm">
                    {errors.confirm_password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="block w-full rounded-lg bg-blue-600 hover:bg-blue-700 px-5 py-3 text-sm font-medium text-white"
              >
                Sign up
              </button>

              <p className="text-center text-sm text-gray-500">
                Already have an account?
                <a
                  className="underline text-blue-500 ml-2"
                  href="/teacher/login"
                >
                  Log in
                </a>
              </p>
            </form>
          </div>
        </div>
      </Spinner>
    </>
  );
};
