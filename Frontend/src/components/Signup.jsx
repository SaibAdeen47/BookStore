import React from "react";
import { Link, Navigate } from "react-router-dom";
import Login from "./Login";
import { useFormik } from "formik";
import { signUpSchema } from "../schema";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { setUserData } from "../redux/slicers/authSlicer";
import axios from "axios";
import { toast } from "react-hot-toast";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const {
    values,
    errors,
    touched,
    resetForm,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  const handleSignUp = async (values) => {
    const data = {
      fullName: values.name,
      email: values.email,
      password: values.password,
    };

    axios
      .post("http://localhost:4001/user/signup", data)
      .then((response) => {
        if (response.status === 201) {
          dispatch(setUserData(response.data));
          navigate("/");
        }
      })
      .catch((error) => {
        resetForm();
        toast.error(error?.response?.data?.message);
      });
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className=" w-[600px] ">
          <div className="modal-box  dark:bg-slate-800 dark:text-white">
            <form method="dialog" onSubmit={handleSubmit}>
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </Link>

              <h3 className="font-bold text-lg">Signup</h3>
              <div className="mt-4 space-y-2">
                <span>Name</span>
                <br />
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your fullname"
                  className="w-80 px-3 py-1 border rounded-md outline-none  dark:bg-slate-800 dark:text-white"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                <br />
                {touched.name && errors.name ? (
                  <span className="text-sm text-red-500">{errors.name}</span>
                ) : null}
              </div>

              <div className="mt-4 space-y-2">
                <span>Email</span>
                <br />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-80 px-3 py-1 border rounded-md outline-none  dark:bg-slate-800 dark:text-white"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <br />
                {touched.email && errors.email ? (
                  <span className="text-sm text-red-500">{errors.email}</span>
                ) : null}
              </div>

              <div className="mt-4 space-y-2">
                <span>Password</span>
                <br />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-80 px-3 py-1 border rounded-md outline-none  dark:bg-slate-800 dark:text-white"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <br />
                {touched.password && errors.password ? (
                  <span className="text-sm text-red-500">
                    {errors.password}
                  </span>
                ) : null}
              </div>

              <div className="flex justify-around mt-4">
                <button
                  className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200"
                  type="submit"
                >
                  Signup
                </button>
                <p className="text-xl">
                  Have account?{" "}
                  <button
                    className="underline text-blue-500 cursor-pointer"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Login
                  </button>{" "}
                  <Login />
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
