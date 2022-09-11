import { createGlobalState } from "react-hooks-global-state";

const { getGlobalState, setGlobalState } = createGlobalState({
  username: "",
  password: "",
});
export { getGlobalState, setGlobalState };
