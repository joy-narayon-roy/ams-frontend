import BasicClass from "./BasicClass.js";
import User from "./User.js";

interface PhoneType {
  _id?: string;
  user_name: string;
  number: string;
  registered_by: string;
  active?: boolean | null;
  user?: string | null;
}

interface UpdateType {
  user_name?: string;
  number?: string;
  registered_by?: string;
  active?: string | boolean;
}

class Phone extends BasicClass {
  id: string | null;
  user_name: string;
  number: string;
  registered_by: string;
  user: string | null;
  active: boolean | null;
  #user: User | null;

  constructor(
    { _id, user_name, number, registered_by, active = null, user }: PhoneType,
    user_class: User | null = null
  ) {
    super("/phone");
    this.id = _id ? _id : null;
    this.user_name = user_name;
    this.number = number;
    this.active = active;
    this.registered_by = registered_by;
    this.#user = user_class ?? null;
    this.user = user ?? null;
  }

  get user_info() {
    return this.#user;
  }

  get data_type(): string {
    return "phone";
  }

  imp({ user_name, number, registered_by, active }: UpdateType) {
    if (user_name) {
      this.user_name = user_name;
    }
    if (number) {
      if (this.#user?.phones.findOneByNumber(number)) {
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

  update(updateData: UpdateType, req: any) {
    const id = this.id;
    if (updateData.number == this.number) {
      delete updateData.number;
    }

    return {
      save() {
        return req.patch(`/phone/${id}`, updateData);
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

export { PhoneType };
export default Phone;
