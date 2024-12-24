import { AxiosInstance } from "axios";

type axiosResType = {
  data: object;
};

class BasicClass {
  #id: string | null;
  #serverPath: string;
  constructor(path: string, id: string | null | undefined) {
    this.#serverPath = path;
    this.#id = id ?? null;
  }
  get id() {
    return this.#id;
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

  old_save(req: AxiosInstance): Promise<axiosResType> {
    return req.post(this.#serverPath, this.toJSON());
  }

  async save(req: AxiosInstance): Promise<axiosResType> {
    const response = await req.post(this.#serverPath, this.toJSON());
    this.#id = response.data._id ?? null;
    return response;
  }
}

export default BasicClass;
