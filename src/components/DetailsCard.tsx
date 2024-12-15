import React from "react";
import app_logo from "../images/app_logo.png";
import close from "../images/close.png";
import titleConverter from "../utilities/titleConverter";
import "../styles/pages_styles/create_account.css";

import Button from "./Button";

export default function DetailsCard({
  icone = "",
  title = "Set it",
  close_on_click = () => {},
  sumit_btn = false,
  save_btn,
  save_btn_click = () => {},

  edit_btn,
  edit_btn_click = () => {},

  delete_btn,
  delete_btn_click = () => {},
  children,
}: {
  icone?: string;
  title?: string;
  close_on_click?: () => unknown;
  sumit_btn: boolean;
  save_btn: boolean;
  save_btn_click?: () => unknown;
  edit_btn: boolean;
  edit_btn_click?: () => unknown;
  delete_btn: boolean;
  delete_btn_click?: () => unknown;
  children: React.ReactElement;
}) {
  return (
    <>
      <section className="details_card">
        <div className="details_card-top">
          <div className="card_logo">
            <img src={icone || app_logo} alt="icone" />
          </div>

          <div className="card_name">
            <h3>{titleConverter(title)}</h3>
          </div>

          <div className="card_close">
            <button type="button" onClick={close_on_click}>
              <img src={close} alt="" />
            </button>
          </div>
        </div>

        <div className="details_card-body">{children}</div>

        <div className="details_card-bottom">
          {delete_btn ? (
            <Button
              type="button"
              on_click={delete_btn_click}
              text={"Delete"}
              class_name={"btn_alert"}
            />
          ) : (
            <div></div>
          )}

          {edit_btn ? (
            <Button type="button" on_click={edit_btn_click} text="Edit" />
          ) : (
            <div></div>
          )}
          {save_btn ? (
            <Button type="button" on_click={save_btn_click} text={"Save"} />
          ) : sumit_btn ? (
            <Button type="submit" text="Submit" />
          ) : (
            <div></div>
          )}
        </div>
      </section>
    </>
  );
}
