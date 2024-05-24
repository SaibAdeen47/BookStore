import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import { Toaster } from "react-hot-toast";
import Signup from "./components/Signup";
import { useSelector } from "react-redux";
import { userData } from "./redux/slicers/authSlicer";

function App() {
  const userInfo = useSelector(userData);

  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={userInfo?.accessToken ? <Courses /> : <Signup />}
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
