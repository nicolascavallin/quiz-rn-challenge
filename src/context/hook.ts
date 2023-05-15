import { useContext } from "react";
import AppContext from "./index";

const useApp = () => {
  const context = useContext(AppContext);

  return {
    ...context,
  };
};

export { useApp };
