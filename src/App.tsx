import React from "react";
import HomePage from "./@ui/pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <div className="h-screen bg-white w-screen pl-[10%] pr-[10%] pt-10 pb-10 flex justify-center">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme="light"
      />

      <HomePage />
    </div>
  );
};

export default App;
