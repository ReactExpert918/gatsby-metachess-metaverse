import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IFriend } from "../../store/chat/chat.interfaces";
import { IAppState } from "../../store/reducers";
import AddFriendListItem from "./AddFriendListItem";
import AddFriendSearchInput from "./AddFriendSearchInput";

const AddFriend = (): JSX.Element => {
  const { friendsList } = useSelector((state: IAppState) => state.chat);
  const [searchText, setSearchText] = useState("");
  const [filteredList, setFilteredList] = useState<IFriend[]>([]);
  const onSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchText(val);
    setFilteredList(
      [...friendsList].filter((f) =>
        f.name.toLowerCase().includes(val.toLowerCase())
      )
    );
  };
  useEffect(() => {
    setSearchText("");
    setFilteredList([...friendsList]);
  },[]);
  return (
    <>
      <AddFriendSearchInput value={searchText} onChange={onSearchTextChange} />
      {filteredList.map((friend) => (
        <AddFriendListItem item={friend} key={friend.id} />
      ))}
    </>
  );
};

export default AddFriend;
