const _addLength = Symbol("_addLength");
const _removeLength = Symbol("_addLength");

interface MyObject {
  key: string;
  value: {};
  index: number;
}

type MyCallback = (data: MyObject) => void;

class ArrayObj extends Object {
  [key: string]: any;
  #length: number;
  constructor() {
    super();
    this.#length = 0;
  }

  get length() {
    return this.#length;
  }

  [_addLength]() {
    this.#length++;
  }

  [_removeLength]() {
    this.#length--;
  }

  add(id: string, value: {}) {
    this[id] = value;
    this[_addLength]();
  }
  remove(id: string) {
    delete this[id];
  }

  map(cb: MyCallback) {
    return Object.keys(this).map((ke: string, ind) =>
      cb({ key: ke, value: this[ke], index: ind })
    );
  }

  [Symbol.iterator]() {
    let index = 0;
    const keys = Object.keys(this);
    const elements = this;

    return {
      next() {
        if (index < keys.length) {
          const key = keys[index++];
          return { value: elements[key], done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }
}

export default ArrayObj;

export { _addLength, _removeLength };
