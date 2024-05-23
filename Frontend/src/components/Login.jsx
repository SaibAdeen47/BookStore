import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../schema";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/slicers/authSlicer";

function Login() {
  const dispatch = useDispatch();
  const initialValues = {
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
    validationSchema: loginSchema,

    onSubmit: (values, action) => {
      dispatch(setUserData(values));
      action.resetForm();
      handleCloseModel();
    },
  });

  const handleCloseModel = () => {
    document.getElementById("my_modal_3").close();
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box  dark:bg-slate-800 dark:text-white">
          <form method="dialog" onSubmit={handleSubmit}>
            <Link
              to="/"
              className="btn btn-sm btn-circle outline-none btn-ghost absolute right-4 top-4 hover:dark:bg-slate-600 dark:text-white"
              onClick={() => {
                handleCloseModel(), resetForm();
              }}
            >
              ✕
            </Link>

            <h3 className="font-bold text-lg ">Login</h3>

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
                <span className="text-sm text-red-500">{errors.password}</span>
              ) : null}
            </div>

            <div className="flex justify-around mt-6">
              <button
                className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200"
                type="submit"
              >
                Login
              </button>
              <p>
                Not registered?{" "}
                <Link
                  to="/signup"
                  className="underline text-blue-500 cursor-pointer"
                >
                  Signup
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
