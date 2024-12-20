import { Email, Phone, User } from "../models";
import httpReq from "../utilities/httpReq";

async function updateEmail(user: User, emailId: string, updatedData: object) {
  const email = user.emails.findById(emailId);
  const updateInstence = email.update(updatedData, httpReq);

  try {
    const { data } = await updateInstence.save();
    const updatedEmail = new Email(data);
    user.emails.add(updatedEmail.id, updatedEmail);
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

async function updatePhone(user: User, id: string, updatedData: object) {
  const phone = user.phones.findOneById(id);
  if (!phone) {
    return {
      done: false,
      message: "Phone not found!",
    };
  }

  const updateInstence = phone.update(updatedData, httpReq);
  try {
    const { data } = await updateInstence.save();
    const updatedPhone = new Phone(data);
    user.phones.add(id, updatedPhone);
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
