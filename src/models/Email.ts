import { AxiosInstance } from "axios";
import BasicClass from "./BasicClass.js";
import Phone from "./Phone.js";
import User from "./User.js";

interface EmailType {
  _id?: string;
  user_name: string;
  address: string;
  phone_number?: string | null;
  password: string;
  phone?: string | null;
  user?: string | null;
}

interface UpdateEmailType {
  user_name?: string;
  address?: string;
  phone_number?: string;
  password?: string;
}

class Email extends BasicClass {
  id: string | null;
  user_name: string;
  address: string;
  password: string;
  user: string | null;
  phone_number: string | null;
  #phone: Phone | null;
  #user: User | null;

  constructor(
    {
      _id,
      user_name,
      address,
      phone_number,
      phone = null,
      password,
      user,
    }: EmailType,
    user_info: User | null = null
  ) {
    super("/email");
    this.#phone = null;
    if (phone) {
      this.#phone = user_info?.phones.findOneById(phone) ?? null;
    }
    this.id = _id ? _id : null;
    this.#user = user_info;
    this.user = user ? user : this.#user ? this.#user.id : null;

    this.user_name = user_name;
    this.address = address;
    this.phone_number =
      phone_number ?? (this.#phone ? this.#phone.number : null);
    this.password = password;
  }

  get phone() {
    return this.#phone;
  }

  get user_info() {
    return this.#user;
  }

  get type() {
    return this.address.split("@")[1].split(".")[0].toUpperCase();
  }

  get data_type() {
    return "email";
  }

  update(updateData: UpdateEmailType, req: AxiosInstance) {
    const id = this.id;

    if (updateData.address == this.address) {
      delete updateData.address;
    }

    return {
      save() {
        return req.patch(`/email/${id}`, updateData);
      },
    };
  }

  // OldtoJSON(): any {
  //   const new_obj = Object.entries(this)
  //     .filter((arr: any): any => arr[1])
  //     .reduce((pre: any, curr: any): any => {
  //       pre[curr[0]] = curr[1];
  //       return pre;
  //     }, {});

  //   new_obj.ref = {
  //     phone: this.#phone?.id,
  //     user: this.#user?.id,
  //   };
  //   return new_obj;
  // }

  toJSON(): any {
    // Create a filtered object by iterating over class properties
    const new_obj = Object.entries(this)
      .filter((value): boolean => Boolean(value[1])) // Filter out falsy values
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

    // Add a `ref` object with specific references
    new_obj.ref = {
      phone: this.#phone?.id ?? null, // Safely access `id` or default to `null`
      user: this.#user?.id ?? null,
    };

    return new_obj;
  }
}

export type { EmailType };
export default Email;
