import { Email, Phone, Profile } from "../models";
import getApiRequest from "./getApiRequest";

async function updateEmail(
  profile: Profile,
  emailId: string,
  updatedData: object
) {
  const req = getApiRequest(await profile.user.getIdToken());
  const email = profile.emails.findById(emailId);

  try {
    const updateInstence = email.update(updatedData, req);
    const { data } = await updateInstence.save();
    const updatedEmail = new Email(data, profile);
    profile.emails.add(updatedEmail.id, updatedEmail);
    return {
      done: true,
      message: "Email updated.",
    };
  } catch (error) {
    let message = "Failed to update";
    if (error && typeof error === "object" && "message" in error) {
      message = (error as { message: string }).message; // Type assertion
    }
    return {
      done: false,
      message: message,
    };
  }
}

async function updatePhone(profile: Profile, id: string, updatedData: object) {
  const phone = profile.phones.findOneById(id);
  if (!phone) {
    return {
      done: false,
      message: "Phone not found!",
    };
  }
  const req = getApiRequest(await profile.user.getIdToken());

  try {
    const updateInstence = phone.update(updatedData, req);
    const { data } = await updateInstence.save();
    const updatedPhone = new Phone(data, profile);
    profile.phones.add(id, updatedPhone);
    return {
      done: true,
      message: "Phone updated.",
    };
  } catch (error) {
    let message = "Failed to update"; // Default message
    if (error && typeof error === "object" && "message" in error) {
      message = (error as { message: string }).message; // Type assertion
    }
    return {
      done: false,
      message: message,
    };
  }
}
export { updateEmail, updatePhone };
