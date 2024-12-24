import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { CreateEmail } from "../create_accounts_forms";

export default function Update_email() {
  const { pathname } = useLocation();
  const { profile } = useAuthContext();
  const id = pathname.replace("/update/email/", "");
  const data = profile?.emails.findById(id);

  return (
    <div className="px-6 py-3">
      <CreateEmail data={data ? data : null} />
    </div>
  );
}
