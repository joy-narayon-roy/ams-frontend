import ArrayObj, { _addLength, _removeLength } from "./ArrayObj.js";
import Phone, { PhoneType } from "./Phone.js";
import User from "./User.js";

const _by_number = Symbol("");

export default class Phones extends ArrayObj {
  [_by_number]: { [key: string]: any };

  constructor(phones: [PhoneType], user: User) {
    super();
    this[_by_number] = {};
    phones.forEach((ele: PhoneType) => {
      const new_phone = new Phone({ ...ele }, user);
      if (new_phone.id) {
        this[new_phone.id] = new_phone;
        this[_by_number][new_phone.number] = new_phone;
        this[_addLength]();
      }
    });
  }

  add(id: string, data: PhoneType | Phone): Phones {
    if (data instanceof Phone) {
      this[id] = data;
      this[_by_number][data.number] = data;
      this[_addLength]();
    } else {
      const new_data = new Phone(data);
      this[id] = new_data;
      this[_by_number][data.number] = new_data;
      this[_addLength]();
    }
    return this;
  }

  remove(id: string): boolean {
    const number = this[id];
    if (number) {
      delete this[_by_number][number.number];
      delete this[id];
      this[_removeLength]();
      return true;
    }
    return false;
  }

  findOneById(id: string): Phone | null {
    return this[id] ? this[id] : null;
  }

  findOneByNumber(number: string): Phone | null {
    return this[_by_number][number] ? this[_by_number][number] : null;
  }

  filterByNumber(number: String): Phone[] {
    return Object.keys(this[_by_number])
      .filter((n: string) => new RegExp(`${number}`, "g").test(n))
      .map((e) => this[_by_number][e]);
  }

  updatePhoneById(id: string, phone: PhoneType) {
    this[id] = phone;
    const old = Object.entries(this[_by_number]).filter((k: any) => k[1] == id);
    if (old.length > 0) {
      delete this[_by_number][old[0][0]];
    }
    this[_by_number][phone.number] = id;
  }
}
