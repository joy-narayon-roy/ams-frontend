import { useEffect } from "react";
import "../styles/pages_styles/create_account.css";

import DetailsCard from "../components/DetailsCard";
import DetailsCreate from "../components/DetailsCreate";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import getEntityIcon from "../utilities/getEntityIcon";
import titleConverter from "../utilities/titleConverter";
import { formValidator, parseForm } from "../tools";
import { useAuthContext } from "../contexts/AuthContext";
import { createEmail, createPhone } from "../utilities/createDatas";
import { useAlert } from "../contexts/AlertContext";

export default function CreateAccount() {
  const location = useLocation();
  const { addAlert } = useAlert();
  const nav = useNavigate();
  const { user } = useAuthContext();
  const { pathname } = location;
  const [mode, entity] = pathname.replace("/", "").split("/");
  const icone = getEntityIcon(entity);

  function close_on_click() {
    nav("/");
  }

  function onSave(ev: React.MouseEvent<HTMLButtonElement>) {
    const inputForm = document.getElementById("inputForm");
    const targetBtn = ev.currentTarget;
    const formFulfild = formValidator(inputForm);
    if (!formFulfild) {
      return false;
    }
    ev.currentTarget.setAttribute("disabled", "true");

    const formData = parseForm(inputForm);

    if (user) {
      switch (entity) {
        case "phone":
          createPhone(user, formData).then((status) => {
            addAlert(status.done ? "success" : "failed", status.message);
            if (status.done) {
              return nav(-1);
            }
            targetBtn.removeAttribute("disabled");
          });
          break;
        case "email":
          createEmail(user, formData).then((status) => {
            addAlert(status.done ? "success" : "failed", status.message);
            if (status.done) {
              return nav(-1);
            }
            targetBtn.removeAttribute("disabled");
          });

          break;

        default:
          targetBtn.removeAttribute("disabled");
          break;
      }
      // TODO: Remove it.
      targetBtn.removeAttribute("disabled");
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formValid = e.currentTarget.checkValidity();
    if (formValid) {
      document.getElementById("saveBtn")?.click();
    } else {
      e.currentTarget.reportValidity();
    }
  }
  useEffect(() => {
    document.title = `AMS - ${mode[0].toUpperCase()}${mode.slice(
      1,
      mode.length
    )} ${titleConverter(entity)}`;
    const eventHanderler = (ev: KeyboardEvent) => {
      if (ev.key == "Escape") {
        close_on_click();
      }
    };
    window.addEventListener("keydown", eventHanderler);

    return () => {
      window.removeEventListener("keydown", eventHanderler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entity]);

  return (
    <>
      <main>
        <DetailsCard
          title={mode}
          delete_btn={false}
          edit_btn={false}
          save_btn={true}
          save_btn_click={onSave}
          icone={icone}
          sumit_btn={false}
          close_on_click={close_on_click}
        >
          <DetailsCreate account_type={entity}>
            <form id="inputForm" onSubmit={onSubmit}>
              <Outlet />
              <button className="hidden" type="submit"></button>
            </form>
          </DetailsCreate>
        </DetailsCard>
      </main>
    </>
  );
}
