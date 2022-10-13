import { createGlobalState } from "react-hooks-global-state";

const { getGlobalState, setGlobalState } = createGlobalState({
  username: "",
  password: "",
  url: "http://192.168.0.15:4000",
  url1: "https://inventorySystem.fahim-shahriyar.repl.co",
});
export { getGlobalState, setGlobalState };
