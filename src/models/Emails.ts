import ArrayObj, { _addLength, _removeLength } from "./ArrayObj.js";
import { EmailType } from "./Email.js";
import Email from "./Email.js";
import User from "./User.js";

const _by_addr = Symbol("");

class Emails extends ArrayObj {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [_by_addr]: { [key: string]: any };

  constructor(emails: [EmailType], user: User) {
    super();
    this[_by_addr] = {};
    emails.forEach((v: EmailType) => {
      const email = new Email({ ...v }, user);
      if (email.id) {
        this[email.id] = email;
        this[_by_addr][email.address] = email;
        this[_addLength]();
      }
    });
  }

  add(id: string | null, value: Email): Emails {
    if (!id) {
      return this;
    }

    if (this[id]) {
      this[id] = value;
      this[_by_addr][value.address] = value;
    }else{
      this[id] = value;
      this[_by_addr][value.address] = value;
      this[_addLength]();
    }

    return this;
  }

  remove(id: string): void {
    const email = this[id];
    if (email) {
      delete this[_by_addr][email.address];
      delete this[id];
      this[_removeLength]();
    }
  }

  findById(id: string): Email {
    return this[id];
  }

  findByAddress(email: string): Email | null {
    return this[_by_addr][email] ?? null;
  }

  filterByAddress(address: string): [Email][] {
    const keys = Object.keys(this[_by_addr])
      .filter((email: string): boolean => {
        return new RegExp(`${address}`, "g").test(email);
      })
      .map((key: string): [Email] => {
        return this[_by_addr][key];
      });

    return keys;
  }
}

export default Emails;
