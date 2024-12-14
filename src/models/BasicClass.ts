class BasicClass {
  #serverPath: string;
  constructor(path: string) {
    this.#serverPath = path;
  }

  get data_type() {
    return this.constructor.name.toLowerCase();
  }

  toJSON() {
    const dataObj = Object.entries(this)
      .map(([key, value]: [string, string]) => {
        if (value == null || value == undefined) {
          return null;
        }
        if (key[0] == "_") {
          key = `${key.slice(1, key.length)}`;
        }
        return { [key]: value };
      })
      .reduce((pre, curr): { [key: string]: string } => {
        return { ...pre, ...curr };
      }, {});
    return dataObj;
  }

  save(req: any): Promise<any> {
    return req.post(this.#serverPath, this.toJSON());
  }
}

export default BasicClass;
