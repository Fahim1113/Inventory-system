import { createGlobalState } from "react-hooks-global-state";

const { getGlobalState, setGlobalState } = createGlobalState({
  username: "",
  password: "",
  url: "http://localhost:4000",
  url1: "https://inventorySystem.fahim-shahriyar.repl.co",
});
export { getGlobalState, setGlobalState };
