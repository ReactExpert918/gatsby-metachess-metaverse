import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatWrapper from "./src/components/ChatWrapper";
import FriendsSidebar from "./src/components/FriendsSidebar";
import Header from "./src/components/Header";
import MaintenanceModal from "./src/components/MaintenanceModal";
import PageBackground from "./src/components/PageBackground";
import ToastProvider from "./src/components/ToastProvider";

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
        <PageBackground />
        <ToastContainer
          autoClose={3000}
          hideProgressBar
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          theme="colored"
        />
        <MaintenanceModal />
      </>
    </div>
  );
};
