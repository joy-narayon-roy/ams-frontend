import User, { UserArg } from "../models/User";
import httpReq from "./httpReq";

export async function getTokenInfo() {
  const { data }: { data: UserArg | null } = await httpReq.get("/user");
  if (data) {
    const newUser = new User(data);
    return newUser;
  } else {
    return null;
  }
}
