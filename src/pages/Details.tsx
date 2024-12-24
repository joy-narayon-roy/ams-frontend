import { useEffect, useState } from "react";
import DetailsCard from "../components/DetailsCard";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import getIcone from "../hooks/useIcone";
import { parseForm } from "../tools";
import { updateEmail, updatePhone } from "../utilities/updateDatas";

import { useAlert } from "../contexts/AlertContext";

export default function Details_page({
  editMode = false,
}: {
  editMode?: boolean;
}) {
  const nav = useNavigate();
  const location = useLocation();
  const { profile } = useAuthContext();
  const { addAlert } = useAlert();

  const { pathname } = location;
  const [mode, entity, id] = pathname.replace("/", "").split("/");

  const [info, setInfo] = useState<{
    name: string | undefined;
    src: string | null;
  }>({
    name: undefined,
    src: null,
  });

  function onEdit() {
    const edit_path = location.pathname.replace("/details", "/update");
    nav(edit_path);
  }

  function onClose() {
    nav(-1);
  }

  function onDelete(ev: React.MouseEvent<HTMLButtonElement>) {
    if (profile) {
      const deleteBtn = ev.currentTarget;

      deleteBtn.setAttribute("disabled", "true");

      const okey = confirm(`Want to Delete - ${entity} - ${id}?`);

      if (okey) {
        if (entity == "phone") {
          profile
            .deletePhoneById(id)
            .then(() => {
              addAlert("success", "Phone deleted done.");
              deleteBtn.removeAttribute("disabled");
              nav("/");
            })
            .catch((err) => {
              addAlert("failed", err.message);
              deleteBtn.removeAttribute("disabled");
            });
        } else if (entity == "email") {
          profile
            .deleteEmailById(id)
            .then(() => {
              addAlert("success", "Email deleted done.");
              deleteBtn.removeAttribute("disabled");
              nav("/");
            })
            .catch((err) => {
              addAlert("failed", err.message);
              deleteBtn.removeAttribute("disabled");
            });
        }
      } else {
        deleteBtn.removeAttribute("disabled");
      }
    }
  }

  function onEditSave(ev: React.MouseEvent<HTMLButtonElement>) {
    if (editMode) {
      ev.currentTarget.setAttribute("disabled", "true");
      const inputForm = document.getElementById("inputForm");
      const targetBtn = ev.currentTarget;

      const updatedData = parseForm(inputForm);

      if (profile) {
        switch (entity) {
          case "phone":
            updatePhone(profile, id, updatedData).then((status) => {
              addAlert(status.done ? "success" : "failed", status.message);
              if (status.done) {
                return nav(-1);
              }
              targetBtn.removeAttribute("disabled");
            });
            break;
          case "email":
            updateEmail(profile, id, updatedData).then((status) => {
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
      }
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
    )}`;
    const onKeydownFun = (ev: KeyboardEvent) => {
      if (ev.key == "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKeydownFun);
    switch (entity) {
      case "email":
        if (profile && profile.emails && profile?.emails.findById(id)) {
          setInfo(getIcone(profile?.emails.findById(id)));
        }
        break;
      case "phone":
        setInfo(getIcone(profile?.phones.findOneById(id)));
        break;

      default:
        break;
    }

    return () => {
      window.removeEventListener("keydown", onKeydownFun);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, entity]);

  const { name, src } = info;
  return (
    <main>
      <DetailsCard
        icone={src ? src : ""}
        title={name ? name : "Details"}
        close_on_click={onClose}
        edit_btn={!editMode}
        edit_btn_click={onEdit}
        delete_btn={editMode}
        delete_btn_click={onDelete}
        save_btn={editMode}
        save_btn_click={onEditSave}
        sumit_btn={false}
      >
        {editMode ? (
          <form id="inputForm" onSubmit={onSubmit}>
            <Outlet />
            <button className="hidden" type="submit"></button>
          </form>
        ) : (
          <Outlet />
        )}
      </DetailsCard>
    </main>
  );
}
