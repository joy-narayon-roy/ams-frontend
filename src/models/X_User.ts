// import Accounts from "./Accounts.js";
// import Phones from "./Phones.js";
// import Phone, { PhoneType } from "./Phone.js";
// import Emails from "./Emails.js";
// import Email, { EmailType } from "./Email.js";
// import { AccountType } from "./Account.js";

// const _id = Symbol("id");

// export interface UserArg {
//   _id: string;
//   name: string;
//   email: string;
//   phones: [PhoneType];
//   emails: [EmailType];
//   accounts: [AccountType];
// }

// class User {
//   [_id]: string;
//   phones: Phones;
//   emails: Emails;
//   accounts: Accounts;
//   name: string;
//   email: string;
//   phone_number: string | null;

//   constructor({ _id: id, name, email, phones, emails, accounts }: UserArg) {
//     this[_id] = id;
//     this.name = name;
//     this.email = email;
//     this.phone_number = null;
//     this.phones = new Phones(phones, this);
//     this.emails = new Emails(emails, this);
//     this.accounts = new Accounts(accounts);
//   }

//   get id() {
//     return this[_id];
//   }

//   createPhone({ number, registered_by, user_name }: PhoneType): Phone {
//     if (this.phones.findOneByNumber(number)) {
//       throw new Error(`${number} already exist.`);
//     }
//     return new Phone({ number, registered_by, user_name }, this);
//   }

//   createEmail({ address, password, user_name, phone_number }: EmailType) {
//     if (this.emails.findByAddress(address)) {
//       throw new Error(`${address} already exist.`);
//     }

//     return new Email(
//       {
//         address,
//         password,
//         user_name,
//         phone_number,
//       },
//       this
//     );
//   }
// }
// export default User;
