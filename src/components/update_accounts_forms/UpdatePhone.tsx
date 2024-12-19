import { useLocation } from "react-router-dom";
import { CreatePhone } from "../create_accounts_forms";
import { useAuthContext } from "../../contexts/AuthContext";

export default function UpdatePhone() {
  const location = useLocation();
  const id = location.pathname.replace("/update/phone/", "");
  const { user } = useAuthContext();
  const data = user && user.phones ? user.phones.findOneById(id) : null;

  return <CreatePhone data={data} />;
}
