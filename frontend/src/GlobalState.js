import { createGlobalState } from "react-hooks-global-state";

const { getGlobalState, setGlobalState } = createGlobalState({
  username: "",
  password: "",
  url: "https://inventory-system-by-fahim.herokuapp.com",
});
export { getGlobalState, setGlobalState };
