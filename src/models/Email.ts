import { AxiosInstance } from "axios";
import BasicClass from "./BasicClass.js";
import Phone from "./Phone.js";
import { Profile } from "./Profile.js";

/*
  user_name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: [true, "Provied Email address."],
  },
  type: {
    type: String,
    default:null
  },
  phone: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: "Phone",
  },
  phone_number: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: [true, "Provide email password."],
  },
  description: {
    type: String,
    default: "",
  },
  author: {
    type: String,
    required: [true, "Email author(uid) required!"],
  },
*/

interface EmailType {
  _id?: string | null;
  user_name: string;
  address: string;
  type?: string | null;
  phone?: string | null;
  phone_number?: string | null;
  password: string;
  description?: string;
}

interface UpdateEmailType {
  user_name?: string;
  address?: string;
  phone_number?: string;
  phone_ref?: string | null | undefined;
  password?: string;
}

class Email extends BasicClass {
  user_name: string;
  address: string;
  #phone: Phone | null;
  phone_number: string | null;
  password: string;
  author: string;
  description: string;
  #profile: Profile | null;

  constructor(
    {
      _id = null,
      user_name,
      address,
      phone_number = null,
      phone = null,
      password,
      description = "",
    }: EmailType,
    profile_info: Profile
  ) {
    super("/email", _id);
    this.#phone = null;
    if (phone) {
      this.#phone = profile_info?.phones.findOneById(phone) ?? null;
    }

    this.user_name = user_name;
    this.address = address;
    this.#profile = profile_info;
    this.phone_number =
      phone_number ?? (this.#phone ? this.#phone.number : null);
    this.password = password;
    this.author = profile_info.uid;
    this.description = description;
  }

  get phone() {
    return this.#phone;
  }

  get profile() {
    return this.#profile;
  }

  get type() {
    return this.address.split("@")[1].split(".")[0].toUpperCase();
  }

  get data_type() {
    return "email";
  }

  update(updateData: UpdateEmailType, req: AxiosInstance) {
    const id = this.id;

    if (updateData.address && updateData.address !== this.address) {
      const existEmail = this.profile?.emails.findByAddress(updateData.address);
      if (existEmail) {
        throw new Error(`${updateData.address} already exists!`);
      }
    }

    if (updateData.phone_number && this.#profile) {
      const existPhone = this.#profile.phones.findOneByNumber(
        updateData.phone_number
      );
      if (existPhone) {
        updateData.phone_ref = existPhone.id;
        delete updateData.phone_number;
      }
    }

    const updatedEntries = Object.entries(updateData).filter(
      ([k, v]) => k && v !== undefined
    );

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
        return req.patch(`email/${id}`, updatedInfo);
      },
    };
  }

  X_toJSON() {
    const new_obj = Object.entries(this)
      .filter((value): boolean => Boolean(value[1]))
      .reduce(
        (
          pre: Record<string, unknown>,
          [key, value]
        ): Record<string, unknown> => {
          pre[key] = value;
          return pre;
        },
        {}
      );

    new_obj.ref = {
      phone: this.#phone?.id ?? null,
    };

    return new_obj;
  }

  toJSON(): { [key: string]: string } {
    // Convert the object's entries to string values to ensure compliance
    const new_obj: { [key: string]: string } = Object.entries(this)
      .filter(([value]) => value[1] != null) // Filter out null or undefined values
      .reduce((pre: { [key: string]: string }, [key, value]) => {
        pre[key] = String(value); // Ensure all values are strings
        return pre;
      }, {});

    // Add the `ref` property with a serialized value
    new_obj.ref = JSON.stringify({
      phone: this.#phone?.id ?? null,
    });

    return new_obj;
  }
}

export type { EmailType };
export default Email;
