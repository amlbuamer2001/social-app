import axios from "axios";
import { createContext } from "react";

export let UserProfileContext = createContext();

export function UserProfileContextProvider(props) {
  function getUserProfile() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  return (
    <UserProfileContext.Provider value={{getUserProfile}}>
      {props.children}
    </UserProfileContext.Provider>
  );
}
