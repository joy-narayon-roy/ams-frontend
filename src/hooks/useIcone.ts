import { Email, Phone } from "../models";
import getEmailProvider from "./getEmailProvider";
import getOperator from "./getOperator";

function getIcone(data: Phone | Email | null | undefined) {
  if (data && data instanceof Phone) {
    return getOperator(data.number);
  } else if (data && data instanceof Email) {
    const type = data.address.split("@")[1].split(".")[0];
    return getEmailProvider({ type });
  } else {
    return { name: "", src: null };
  }
}

export default getIcone;
