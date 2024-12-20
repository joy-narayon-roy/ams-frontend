import { AxiosError } from "axios";
import { User } from "../models";
import { PhoneType } from "../models/Phone";
import { EmailType } from "../models/Email";

import httpReq from "./httpReq";

type createReturnType = {
  done: boolean;
  message: string;
};

function hendelError(err: unknown): createReturnType {
  if (err instanceof AxiosError) {
    return {
      done: false,
      message: err.response?.data?.message || "An error occurred.",
    };
  }
  if (err instanceof Error) {
    return {
      done: false,
      message: err.message,
    };
  }
  return {
    done: false,
    message: "Unknown error occurred.",
  };
}

async function createPhone(
  user: User,
  formData: Partial<PhoneType>
): Promise<createReturnType> {
  try {
    const new_phone = user.createPhone({
      user_name: formData.user_name!,
      number: formData.number!,
      registered_by: formData.registered_by!,
    });
    const response = await new_phone.save(httpReq);
    const _id = (response.data as { _id: string })._id;
    new_phone.id = _id;
    user.phones.add(_id, new_phone);
    return {
      done: true,
      message: "Phone " + new_phone.number + " Saved.",
    };
  } catch (err) {
    return hendelError(err);
  }
}

async function createEmail(
  user: User,
  formData: Partial<EmailType>
): Promise<createReturnType> {
  try {
    const new_email = user.createEmail({
      user_name: formData.user_name!,
      address: formData.address!,
      password: formData.password!,
    });
    const response = await new_email.save(httpReq);
    const _id = (response.data as { _id: string })._id;
    new_email.id = _id;
    user.emails.add(_id, new_email);
    return {
      done: true,
      message: "Email " + new_email.address + " saved.",
    };
  } catch (err) {
    return hendelError(err);
  }
}

export { createEmail, createPhone };
