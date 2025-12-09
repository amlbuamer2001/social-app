import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [user, setUser] = useState(localStorage.getItem("userToken"));

  // useEffect(()=>{
  //     let token = localStorage.getItem("userToken");
  //     if(token){
  //         setUser(token);
  //     }
  // }, []);

  // or

  //  useEffect(()=>{
  //     if(localStorage.getItem("userToken")){
  //         setUser(localStorage.getItem("userToken"))
  //     }
  // }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
