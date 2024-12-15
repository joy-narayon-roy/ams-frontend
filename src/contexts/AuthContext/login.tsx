import { AxiosError } from "axios";
import httpReq from "../../utilities/httpReq";
import { UserArg } from "../../models/User";

export interface loginInterface {
  email: string;
  password: string;
}

export type AuthResponse = {
  status: number;
  message: string;
  user: null | UserArg;
  token: null | string;
};

export async function loginFunc({
  email,
  password,
}: loginInterface): Promise<AuthResponse> {
  try {
    const { data, status } = await httpReq.post(
      "/login",
      { email, password },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    return {
      status,
      message: data.message,
      user: data.user,
      token: data.token,
    };
  } catch (err) {
    if (err instanceof AxiosError) {
      const msg = err.response?.data?.message || "An error occurred";
      throw {
        status: err.response?.status || 500,
        message: msg,
        user: null,
        token: null,
      };
    }
    throw {
      status: 500,
      message: "Unexpected error",
      user: null,
      token: null,
    };
  }
}
