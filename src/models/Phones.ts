import ArrayObj, { _addLength, _removeLength } from "./ArrayObj.js";
import Phone, { PhoneType } from "./Phone.js";
import { Profile } from "./Profile.js";

const _by_number = Symbol("");

export default class Phones extends ArrayObj {
  [_by_number]: { [key: string]: Phone };

  constructor(phones: [PhoneType] | [] = [], profile: Profile) {
    super();
    this[_by_number] = {};
    for (const ele of phones) {
      // const new_phone = new Phone(ele, profile);
      const new_phone = new Phone(ele, profile);
      if (new_phone.id) {
        this[new_phone.id] = new_phone;
        this[_by_number][new_phone.number] = new_phone;
        this[_addLength]();
      }
    }
  }

  add(id: string | null, data: Phone): Phones {
    if (id) {
      this[id] = data;
      this[_by_number][data.number] = data;
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

  filterByNumber(number: string): Phone[] {
    return Object.keys(this[_by_number])
      .filter((n: string) => new RegExp(`${number}`, "g").test(n))
      .map((e) => this[_by_number][e]);
  }

  updatePhoneById(id: string, phone: PhoneType) {
    this[id] = phone;
    const old = Object.entries(this[_by_number]).filter(
      ([k]: [string, Phone]) => k == id
    );
    if (old.length > 0) {
      delete this[_by_number][old[0][0]];
    }
    // this[_by_number][phone.number].id = id;
  }
}
