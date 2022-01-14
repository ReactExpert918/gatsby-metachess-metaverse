import React, { SyntheticEvent, useEffect, useState } from "react";
import API from "../../services/api.service";
import { ENDPOINTS } from "../../services/endpoints";
import TextField from "../TextField";
import Select from "../Select";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Actions } from "../../store/user/user.action";

export enum UserTypes {
  "player" = 1,
  "arbiter",
  "Event Organizer",
  "Manager/Sponsor",
  "Instructor",
  "Others",
}

interface Country {
  Id: number;
  Name: string;
  Code: string;
}

interface CountryListType extends Country {
  value: number;
  label: string;
  Code: string;
}

export interface countryList extends Array<CountryListType> {}

interface IProps {
  setEditing: Function;
}

const UserEditInfo = (props: IProps) => {
  const [userType, setUserType] =
    useState<{ label: string; value: UserTypes }>(null);
  const [country, setCountry] = useState<CountryListType>(null);
  const [countries, setCountries] = useState<countryList>([]);
  const [name, setName] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [avatarName, setAvatarName] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const dispatch = useDispatch();
  const userTypes = [
    "player",
    "arbiter",
    "Event Organizer",
    "Manager/Sponsor",
    "Instructor",
    "Others",
  ].map((e: string) => ({ label: e, value: UserTypes[e] }));
  const handleSubmit = async (e): void => {
    e.preventDefault();
    props.setEditing(false);
    dispatch(
      Actions.updateUser({
        Fullname: name,
        Type: userType.value,
        CountryId: country.value,
        WalletAddress: walletAddress,
        Avatar: avatar,
      })
    );
  };
  const handleSelectInputChange = (name: string, selectedOption: any) => {
    // console.log(selectedOption);
    if (name !== "userType") {
      setCountry(selectedOption);
    } else {
      setUserType(selectedOption);
    }
  };

  const imageInputChange = (e1: any) => {
    const reader = new FileReader();
    const name = e1.target.files[0].name;
    reader.onload = function (e2) {
      var image = new Image();
      image.src = e2.target.result;
      image.onload = function (e3) {
        var height = this.height;
        var width = this.width;
        if (height > 100 || width > 100) {
          toast.error("Please Upload an image less than 100x100 size");
          return false;
        }
        setAvatar(e2.target.result);
        setAvatarName(name);
        return true;
      };
    };
    reader.readAsDataURL(e1.target.files[0]);
  };

  useEffect(() => {
    const func = async () => {
      const res = await API.execute("GET", ENDPOINTS.GET_COUNTRIES);
      const countriesList = res.map((country: Country) => {
        return {
          ...country,
          label: country.Name,
          value: country.Id,
        };
      });
      setCountries(countriesList);
    };
    func();
  }, []);
  return (
    <div className="Form-container">
      <div className="Form-wrapper">
        <form
          className="signup-page__form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <label className="Lables">Name</label>
          <TextField
            type="text"
            label="John.snow"
            autoComplete="off"
            value={name}
            name="name"
            onChange={(e: SyntheticEvent) => {
              setName(e.target.value);
            }}
            required={true}
          />
          <label className="Lables">User Type</label>
          <Select
            placeholder="select usertype"
            label="user type"
            options={userTypes}
            value={userType}
            name="userType"
            onChange={(selectedOption: any) => {
              handleSelectInputChange("userType", selectedOption);
            }}
          />
          <label className="Lables">Country</label>
          <Select
            placeholder="select country"
            label="country"
            options={countries}
            value={country}
            name="country"
            onChange={(selectedOption: any) => {
              handleSelectInputChange("country", selectedOption);
            }}
          />
          <label className="Lables">Wallet Address</label>
          <TextField
            type="text"
            label="5J3mBbAH58CpQ3Y5RNJpUKPE62SQ5tfcvU2JpbnkeyhfsYB1Jcn"
            autoComplete="off"
            value={walletAddress}
            name="Wallet"
            onChange={(e: SyntheticEvent) => {
              setWalletAddress(e.target.value);
            }}
            required={true}
          />
          <label className="Lables">Avatar</label>
          <label htmlFor="avatarInput" className="avatarLabel">
            {(avatarName && avatarName + " Selected! Click to change") ||
              "No Image Selected! Click to select"}
          </label>
          <input
            type="file"
            onChange={imageInputChange}
            accept="image/*"
            id="avatarInput"
            style={{ display: "none" }}
          />
          <button className="claimButton">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UserEditInfo;
