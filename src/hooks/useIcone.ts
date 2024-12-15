import { Email, Phone } from "../models";
import getEmailProvider from "./getEmailProvider";
import getOperator from "./getOperator";

function useIcone(data: Phone | Email | null | undefined) {
  if (data && data instanceof Phone) {
    return getOperator(data.number);
  } else if (data && data instanceof Email) {
    const type = data.address.split("@")[1].split(".")[0];
    return getEmailProvider({ type });
  } else {
    return { name: "", src: null };
  }
}

export default useIcone;
