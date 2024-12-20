import { useEffect, useState } from "react";
import DetailsCard from "../components/DetailsCard";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import getIcone from "../hooks/useIcone";
import { parseForm } from "../tools";
import { updateEmail, updatePhone } from "../utilities/updateDatas";
import httpReq from "../utilities/httpReq";
import { useAlert } from "../contexts/AlertContext";

export default function Details_page({
  editMode = false,
}: {
  editMode?: boolean;
}) {
  const nav = useNavigate();
  const location = useLocation();
  const { user } = useAuthContext();
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
    const deleteBtn = ev.currentTarget;
    deleteBtn.setAttribute("disabled", "true");
    const okey = confirm(`Want to Delete - ${entity} - ${id}?`);
    if (okey) {
      httpReq
        .delete(`${entity}/${id}`)
        .then(() => {
          addAlert("success", `${entity} ${id} deleted.`);
          if (user) {
            switch (entity) {
              case "phone":
                user.phones.remove(id);
                break;
              case "email":
                user.emails.remove(id);
                break;
              default:
                break;
            }
          }
          nav("/");
        })
        .catch((err) => {
          addAlert("failed", `Faild to delete ${entity} ${id}.`);
          console.log(err);
        });
    } else {
      deleteBtn.removeAttribute("disabled");
    }
  }

  function onEditSave(ev: React.MouseEvent<HTMLButtonElement>) {
    if (editMode) {
      ev.currentTarget.setAttribute("disabled", "true");
      const inputForm = document.getElementById("inputForm");
      const targetBtn = ev.currentTarget;

      const updatedData = parseForm(inputForm);

      if (user) {
        switch (entity) {
          case "phone":
            updatePhone(user, id, updatedData).then((status) => {
              addAlert(status.done ? "success" : "failed", status.message);
              if (status.done) {
                return nav(-1);
              }
              targetBtn.removeAttribute("disabled");
            });
            break;
          case "email":
            updateEmail(user, id, updatedData).then((status) => {
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
        if (user && user.emails && user?.emails.findById(id)) {
          setInfo(getIcone(user?.emails.findById(id)));
        }
        break;
      case "phone":
        setInfo(getIcone(user?.phones.findOneById(id)));
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
          <form onSubmit={onSubmit}>
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
