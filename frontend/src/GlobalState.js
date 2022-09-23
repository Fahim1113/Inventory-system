import { createGlobalState } from "react-hooks-global-state";

const { getGlobalState, setGlobalState } = createGlobalState({
  username: "",
  password: "",
  url: "http://localhost:4000",
});
export { getGlobalState, setGlobalState };
