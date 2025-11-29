import { createContext, useState } from "react";

export let CounterContext = createContext();

export function CounterContextProvider(props) {    
  let [count, setCount] = useState(0);

  setCount(count + 1);

  return (
    <CounterContext.Provider value={{ count, setCount }}>
      {props.children}
    </CounterContext.Provider>
  );
}
