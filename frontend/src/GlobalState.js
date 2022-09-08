import { createGlobalState } from "react-hooks-global-state";

const { getGlobalState, setGlobalState } = createGlobalState({
  loggedIn: false,
  username: "",
  password: "",
});
export { getGlobalState, setGlobalState };
