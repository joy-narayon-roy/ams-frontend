/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import DetailsCard from "../components/DetailsCard";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import useIcone from "../hooks/useIcone";
import { Email, Phone, User } from "../models";
import httpReq from "../utilities/httpReq";

async function updateEmail(user: User, emailId: string, updatedData: object) {
  const email = user.emails.findById(emailId);
  const updateInstence = email.update(updatedData, httpReq);

  try {
    const { data } = await updateInstence.save();
    const updatedEmail = new Email(data);
    user.emails.add(updatedEmail.id, updatedEmail);
    return {
      done: true,
      message: "Email updated.",
    };
  } catch (error) {
    let message = "Failed to update"; // Default message
    if (error && typeof error === "object" && "message" in error) {
      message = (error as { message: string }).message; // Type assertion
    }
    return {
      done: false,
      message: message,
    };
  }
}

async function updatePhone(user: User, id: string, updatedData: object) {
  const phone = user.phones.findOneById(id);
  if (!phone) {
    return {
      done: false,
      message: "Phone not found!",
    };
  }

  const updateInstence = phone.update(updatedData, httpReq);
  try {
    const { data } = await updateInstence.save();
    const updatedPhone = new Phone(data);
    user.phones.add(id, updatedPhone);
    return {
      done: true,
      message: "Phone updated.",
    };
  } catch (error) {
    let message = "Failed to update"; // Default message
    if (error && typeof error === "object" && "message" in error) {
      message = (error as { message: string }).message; // Type assertion
    }
    return {
      done: false,
      message: message,
    };
  }
}

export default function Details_page({
  editMode = false,
}: {
  editMode?: boolean;
}) {
  const nav = useNavigate();
  const location = useLocation();
  const { user } = useAuthContext();

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

  useEffect(() => {
    document.title = `AMS - ${mode[0].toUpperCase()}${mode.slice(
      1,
      mode.length
    )}`;
    switch (entity) {
      case "email":
        if (user && user.emails && user?.emails.findById(id)) {
          setInfo(useIcone(user?.emails.findById(id)));
        }
        break;
      case "phone":
        setInfo(useIcone(user?.phones.findOneById(id)));
        break;

      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  function onEditSave(ev: React.MouseEvent<HTMLButtonElement>) {
    if (editMode) {
      ev.currentTarget.setAttribute("disabled", "true");
      // const [path, id] = location.pathname.replace("/update/", "").split("/");
      const inputForm = document.getElementById("inputForm");
      const inputs = inputForm
        ? [...inputForm.getElementsByTagName("input")]
        : [];

      inputs.forEach((inp: HTMLInputElement) => {
        inp.checkValidity();
      });

      const updatedData = inputs.reduce<Record<string, string>>((pre, curr) => {
        pre[curr.name] = curr.value;
        return pre;
      }, {});

      if (user) {
        switch (entity) {
          case "phone":
            updatePhone(user, id, updatedData).then((status) => {
              if (status.done) {
                return nav(-1);
              }
              ev.currentTarget.removeAttribute("disabled");
            });
            break;
          case "email":
            updateEmail(user, id, updatedData).then((status) => {
              if (status.done) {
                return nav(-1);
              }
              ev.currentTarget.removeAttribute("disabled");
            });

            break;

          default:
            break;
        }
      }
    }
  }

  function onDelete() {
    console.log("Deleteing");
  }

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
          <form className="px-6 py-3" id="inputForm">
            <Outlet />
          </form>
        ) : (
          <Outlet />
        )}
      </DetailsCard>
    </main>
  );
}
