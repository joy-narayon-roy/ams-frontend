import { useLocation } from "react-router-dom";
import { CreatePhone } from "../create_accounts_forms";
import { useAuthContext } from "../../contexts/AuthContext";

export default function UpdatePhone() {
  const location = useLocation();
  const id = location.pathname.replace("/update/phone/", "");
  const { profile } = useAuthContext();
  const data =
    profile && profile.phones ? profile.phones.findOneById(id) : null;

  return (
    <div className="px-6 py-3">
      <CreatePhone data={data} />
    </div>
  );
}
