import style from "../../styles/components_styles/details_table.module.css";
import copy from "../../images/copying.png";
import VerticalCard from "../VerticalCard";
import { useLocation, useNavigate } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext";

export default function EmailTable() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const { profile } = useAuthContext();
  const id = pathname.replace("/details/email/", "");
  const email = profile?.emails.findById(id);

  const phone = email?.phone;
  const phone_number = email?.phone_number;
  const onCopy = (ev: string) => {
    window.navigator.clipboard.writeText(ev).then(() => {
      alert(`${ev} Copy.`);
    });
  };
  function goto_details(path: string, id: string) {
    nav(`/details/${path}/${id}`);
  }

  return (
    <table className={style["details_card-body_table"]}>
      <tbody>
        <tr className={style["details_card-body_table_tr"]}>
          <td className={style["details_card-body_table_tr_td"]}>User :</td>
          <td className={style["details_card-body_table_tr_td"]}>
            {email?.user_name}
          </td>

          <td className={style["details_card-body_table_tr_td"]}>
            <button
              type="button"
              onClick={() => onCopy(email?.user_name || "")}
              className={style["details_card-body_table_tr_td_button"]}
            >
              <img src={copy} alt="" />
            </button>
          </td>
        </tr>

        <tr className={style["details_card-body_table_tr"]}>
          <td className={style["details_card-body_table_tr_td"]}>Address :</td>
          <td className={style["details_card-body_table_tr_td"]}>
            {email?.address}
          </td>

          <td className={style["details_card-body_table_tr_td"]}>
            <button
              onClick={() => onCopy(email?.address || "")}
              type="button"
              className={style["details_card-body_table_tr_td_button"]}
            >
              <img src={copy} alt="" />
            </button>
          </td>
        </tr>

        {phone_number && !phone && (
          <tr className={style["details_card-body_table_tr"]}>
            <td className={style["details_card-body_table_tr_td"]}>
              Phone Number :
            </td>
            <td className={style["details_card-body_table_tr_td"]}>
              {phone_number}
            </td>
            <td className={style["details_card-body_table_tr_td"]}>
              <button
                type="button"
                onClick={() => onCopy(pathname || "")}
                className={style["details_card-body_table_tr_td_button"]}
              >
                <img src={copy} alt="" />
              </button>
            </td>
          </tr>
        )}

        {phone && (
          <tr className={style["details_card-body_table_tr"]}>
            <td className={style["details_card-body_table_tr_td"]}>Phone :</td>
            <td className={style["details_card-body_table_tr_td"]}>
              <VerticalCard
                data={phone}
                on_click={() => goto_details("phone", phone.id || "")}
              />
            </td>
            <td className={style["details_card-body_table_tr_td"]}>
              <button
                type="button"
                onClick={() => onCopy(phone.number || "")}
                className={style["details_card-body_table_tr_td_button"]}
              >
                <img src={copy} alt="" />
              </button>
            </td>
          </tr>
        )}

        <tr className={style["details_card-body_table_tr"]}>
          <td className={style["details_card-body_table_tr_td"]}>Password :</td>
          <td className={style["details_card-body_table_tr_td"]}>
            {email?.password}
          </td>
          <td className={style["details_card-body_table_tr_td"]}>
            <button
              type="button"
              className={style["details_card-body_table_tr_td_button"]}
              onClick={() => onCopy(email?.password || "")}
            >
              <img src={copy} alt="" />
            </button>
          </td>
        </tr>

        <tr className={style["details_card-body_table_tr"]}>
          <td className={style["details_card-body_table_tr_td"]}>Accounts :</td>
          <td className={style["details_card-body_table_tr_td"]}>
            {/* {data.password} */}
          </td>
          <td className={style["details_card-body_table_tr_td"]}>
            <button
              onClick={() => onCopy("")}
              type="button"
              className={style["details_card-body_table_tr_td_button"]}
            >
              <img src={copy} alt="" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
