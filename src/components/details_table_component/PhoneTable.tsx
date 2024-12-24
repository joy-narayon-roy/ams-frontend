import style from "../../styles/components_styles/details_table.module.css";
import copy from "../../images/copying.png";
import { useLocation } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext";

export default function PhoneTable() {
  const { pathname } = useLocation();
  const { profile } = useAuthContext();
  const id = pathname.replace("/details/phone/", "");
  const data = profile?.phones.findOneById(id);

  const onCopy = (ev: string) => {
    window.navigator.clipboard.writeText(ev).then(() => {
      alert(`${ev} Copy.`);
    });
  };

  return (
    <table className={style["details_card-body_table"]}>
      <tbody>
        <tr className={style["details_card-body_table_tr"]}>
          <td className={style["details_card-body_table_tr_td"]}>User :</td>
          <td className={style["details_card-body_table_tr_td"]}>
            {data?.user_name}
          </td>
          <td className={style["details_card-body_table_tr_td"]}>
            <button
              onClick={() => onCopy(data?.user_name || "Not found")}
              type="button"
              className={style["details_card-body_table_tr_td_button"]}
            >
              <img src={copy} alt="" />
            </button>
          </td>
        </tr>
        <tr className={style["details_card-body_table_tr"]}>
          <td className={style["details_card-body_table_tr_td"]}>
            Phone Number :
          </td>
          <td className={style["details_card-body_table_tr_td"]}>
            {data?.number}
          </td>
          <td className={style["details_card-body_table_tr_td"]}>
            <button
              onClick={() => onCopy(data?.number || "Not found")}
              type="button"
              className={style["details_card-body_table_tr_td_button"]}
            >
              <img src={copy} alt="" />
            </button>
          </td>
        </tr>
        <tr className={style["details_card-body_table_tr"]}>
          <td className={style["details_card-body_table_tr_td"]}>
            Registered By :
          </td>
          <td className={style["details_card-body_table_tr_td"]}>
            {data?.registered_by}
          </td>
          <td className={style["details_card-body_table_tr_td"]}>
            <button
              type="button"
              onClick={() => onCopy(data?.registered_by || "Not found")}
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
