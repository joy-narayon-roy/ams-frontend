import { AxiosInstance } from "axios";
import BasicClass from "./BasicClass.js";
import { Profile } from "./Profile.js";

interface PhoneType {
  _id?: string | null | undefined;
  user_name: string;
  number: string;
  registered_by: string;
  active?: boolean | null;
  description?: string;
}

interface UpdateType {
  user_name?: string;
  number?: string;
  registered_by?: string;
  active?: string | boolean;
  description?: string;
}

class Phone extends BasicClass {
  user_name: string;
  number: string;
  registered_by: string;
  active: boolean | null;
  description: string;
  author: string;
  #profile: Profile | null;

  constructor(
    {
      _id,
      user_name,
      number,
      registered_by,
      active = true,
      description = "",
    }: PhoneType,
    profile_class: Profile
  ) {
    super("/phone", _id);
    this.user_name = user_name;
    this.number = number;
    this.active = active;
    this.registered_by = registered_by;
    this.description = description;
    this.author = profile_class.uid;
    this.#profile = profile_class;
  }

  get profile() {
    return this.#profile;
  }

  imp({ user_name, number, registered_by, active }: UpdateType) {
    if (user_name) {
      this.user_name = user_name;
    }
    if (number) {
      if (this.#profile?.phones.findOneByNumber(number)) {
        throw new Error("Phone alrady exist");
      }
      this.number = number;
    }
    if (registered_by) {
      this.registered_by = registered_by;
    }
    if (active == "true" || active == "false") {
      this.active = active == "true" ? true : false;
    }
  }

  update(updateData: UpdateType, req: AxiosInstance) {
    const id = this.id;
    const jsonForm = this.toJSON();

    const updatedEntries = Object.entries(updateData).filter(
      ([k, v]: [string, unknown]) => (jsonForm ? jsonForm[k] !== v : false)
    );

    if (updateData.number && updateData.number !== this.number) {
      const existPhone = this.profile?.phones.findOneByNumber(
        updateData.number
      );

      if (existPhone) {
        throw new Error(`${existPhone.number} is a;ready exists!`);
      }
    }

    if (updatedEntries.length === 0) {
      return {
        async save() {
          return { data: updateData };
        },
      };
    }

    const updatedInfo = updatedEntries.reduce(
      (pre: { [key: string]: string }, [k, v]) => {
        pre[k] = v;
        return pre;
      },
      {}
    );

    return {
      save() {
        return req.patch(`phone/${id}`, updatedInfo);
      },
    };
  }

  static validateBangladeshiPhoneNumber(phoneNumber: string): boolean {
    const bangladeshiPhoneNumberRegex = /^(?:\+?880|0)(?:\d{10}|\d{8})$/;
    return bangladeshiPhoneNumberRegex.test(phoneNumber);
  }
  validateBangladeshiPhoneNumber(phoneNumber: string): boolean {
    const bangladeshiPhoneNumberRegex = /^(?:\+?880|0)(?:\d{10}|\d{8})$/;
    return bangladeshiPhoneNumberRegex.test(phoneNumber);
  }
}

export type { PhoneType };
export default Phone;
