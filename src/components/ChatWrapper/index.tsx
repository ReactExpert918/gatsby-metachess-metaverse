import React from "react";
import BottomChat from "../BottomChat";
import SideChat from "../SideChat";
const ChatWrapper = ({ children }: { children: any }) => {
  return (
    <>
      {children}
      {/* <BottomChat/>
      <SideChat /> */}
    </>
  );
};

export default ChatWrapper;
