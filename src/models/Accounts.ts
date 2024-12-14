import { AccountType } from "./Account.js";
import ArrayObj, { _addLength } from "./ArrayObj.js";

class Accounts extends ArrayObj {
  constructor(accounts: [AccountType]) {
    super();
    accounts.forEach((v: AccountType) => {
      if (v._id) {
        this[v._id] = v;
        this[_addLength]();
      }
    });
  }
}

export default Accounts;
