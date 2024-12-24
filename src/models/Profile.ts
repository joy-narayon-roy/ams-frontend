import Phones from "./Phones";
import Phone, { PhoneType } from "./Phone.js";
import Emails from "./Emails.js";
import Email, { EmailType } from "./Email.js";
import getApiReqiest from "../utilities/getApiRequest.js";
import { User } from "firebase/auth";

interface ProfileConstructor {
  uid: string;
  pin?: string | null;
  phones: [PhoneType] | [];
  emails: [EmailType] | [];
}
class Profile {
  uid: string;
  pin: string | null;
  phones: Phones;
  emails: Emails;
  #user: User;

  constructor(
    { uid, pin = null, phones, emails }: ProfileConstructor,
    user: User
  ) {
    this.uid = uid;
    this.pin = pin;
    this.phones = new Phones(phones, this);
    this.emails = new Emails(emails, this);
    this.#user = user;
  }

  get user() {
    return this.#user;
  }

  public async loadInfo(token: string) {
    const req = getApiReqiest(token);
    const { data } = await req.get("/profile");
    console.log(data);
    return token;
  }

  createPhone({
    number,
    registered_by,
    user_name,
    active,
    description,
  }: PhoneType): Phone {
    if (this.phones.findOneByNumber(number)) {
      throw new Error(`${number} already exist.`);
    }
    return new Phone(
      { number, registered_by, user_name, active, description },
      this
    );
  }

  createEmail({
    address,
    password,
    user_name,
    phone_number,
    description,
  }: EmailType) {
    if (this.emails.findByAddress(address)) {
      throw new Error(`${address} already exist.`);
    }

    const existPhone = phone_number
      ? this.phones.findOneByNumber(phone_number)
      : null;

    return new Email(
      {
        address,
        password,
        user_name,
        phone: existPhone ? existPhone.id : null,
        phone_number: existPhone ? null : phone_number,
        description,
      },
      this
    );
  }

  async deletePhoneById(id: string) {
    try {
      const token = await this.#user.getIdToken();
      const req = getApiReqiest(token);
      await req.delete(`phone/${id}`);
      this.phones.remove(id);
      return {
        done: true,
        message: "Phone delete",
      };
    } catch {
      throw {
        done: false,
        message: "Phone delete",
      };
    }
  }

  async deleteEmailById(id: string) {
    try {
      const token = await this.#user.getIdToken();
      const req = getApiReqiest(token);
      await req.delete(`email/${id}`);
      this.emails.remove(id);
      return {
        done: true,
        message: "Email delete",
      };
    } catch {
      throw {
        done: false,
        message: "Email delete",
      };
    }
  }
}
export default Profile;
export { Profile };
