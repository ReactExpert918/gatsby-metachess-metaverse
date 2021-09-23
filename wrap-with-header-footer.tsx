import React from "react";
import Header from "./src/components/Header";
import Footer from "./src/components/Footer";
import ToastProvider from "./src/components/ToastProvider";
import SideChat from "./src/components/BottomChat";
import ChatWrapper from "./src/components/ChatWrapper";

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
      </>
    </div>
  );
};
