import parseForm from "./parseForm";
import { EmailType } from "../models";

function parseEmailForm(form: HTMLFormElement | HTMLElement | null): EmailType {
  if (!form) {
    throw new Error("Form is not valid");
  }
  const formData = parseForm(form);
  const data: EmailType = {
    address: "",
    password: "",
    user_name: "",
    ...formData,
  };
  return data;
}

export default parseEmailForm;
