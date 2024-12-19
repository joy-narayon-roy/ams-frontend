import React from "react";
import style from "../../styles/components_styles/details_table.module.css";
import copy from "../../images/copying.png";

export default function Account_table() {
  return (
    <table className={style["details_card-body_table"]}>
      <tbody>
        <tr className={style["details_card-body_table_tr"]}>
          <td className={style["details_card-body_table_tr_td"]}>User :</td>
          <td className={style["details_card-body_table_tr_td"]}>user_name</td>
          <td className={style["details_card-body_table_tr_td"]}>
            <button
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
            phone_number
          </td>
          <td className={style["details_card-body_table_tr_td"]}>
            <button
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
            registered_name
          </td>
          <td className={style["details_card-body_table_tr_td"]}>
            <button
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
