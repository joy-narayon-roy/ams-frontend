import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { CreateEmail } from "../create_accounts_forms";

export default function Update_email() {
  const { pathname } = useLocation();
  const { user } = useAuthContext();
  const id = pathname.replace("/update/email/", "");
  const data = user?.emails.findById(id);

  return <CreateEmail data={data ? data : null} />;
}
