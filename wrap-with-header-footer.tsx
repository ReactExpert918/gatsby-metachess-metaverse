import React from "react";
import Header from "./src/components/Header";
import Footer from "./src/components/Footer";
import ToastProvider from "./src/components/ToastProvider";
import "react-toastify/dist/ReactToastify.css";
import ChatWrapper from "./src/components/ChatWrapper";
import FriendsSidebar from "./src/components/FriendsSidebar";
import { ToastContainer } from "react-toastify";

export default ({ element, props }: { element: JSX.Element; props: any }) => {
  return (
    <div
      className={`wrapContainer ${
        props.path.includes("/game") ? "no-scroll" : ""
      }`}
    >
      <Header {...props} />
      <>
        <main className={"wrapPage"}>
          <ChatWrapper>
            <ToastProvider>{element}</ToastProvider>
          </ChatWrapper>
        </main>
        {/* <Footer {...props}  /> */}
        {/* <SideChat /> */}
        <FriendsSidebar />
        <ToastContainer
          autoClose={3000}
          hideProgressBar
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
        />
      </>
    </div>
  );
};
