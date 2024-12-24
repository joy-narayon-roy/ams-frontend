import parseForm from "./parseForm";
import { PhoneType } from "../models";

function parsePhoneForm(form: HTMLFormElement | HTMLElement | null): PhoneType {
  if (!form) {
    throw new Error("Form is not valid");
  }
  const formData = parseForm(form);
  const data = {
    number: "",
    registered_by: "",
    user_name: "",
    active: true,
    description: "",
    ...formData,
  };
  return data;
}

export default parsePhoneForm;
