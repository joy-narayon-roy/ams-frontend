import { AxiosError } from "axios";
import { Profile, EmailType, PhoneType } from "../models";

import getApiRequest from "./getApiRequest";

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
  profile: Profile,
  formData: PhoneType
  // formData: Partial<PhoneType>
): Promise<createReturnType> {
  try {
    const req = getApiRequest(await profile.user.getIdToken());
    const new_phone = profile.createPhone({
      user_name: formData.user_name!,
      number: formData.number!,
      registered_by: formData.registered_by!,
      active: formData.active!,
      description: formData.description,
    });
    await new_phone.save(req);
    profile.phones.add(new_phone.id, new_phone);
    return {
      done: true,
      message: "Phone " + new_phone.number + " Saved.",
    };
  } catch (err) {
    return hendelError(err);
  }
}

async function createEmail(
  profile: Profile,
  // formData: Partial<EmailType>
  formData: EmailType
): Promise<createReturnType> {
  try {
    const req = getApiRequest(await profile.user.getIdToken());
    const new_email = profile.createEmail({ ...formData });
    await new_email.save(req);

    profile.emails.add(new_email.id, new_email);
    return {
      done: true,
      message: "Email " + new_email.address + " saved.",
    };
  } catch (err) {
    return hendelError(err);
  }
}

export { createEmail, createPhone };
