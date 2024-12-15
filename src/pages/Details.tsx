/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import DetailsCard from "../components/DetailsCard";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import useIcone from "../hooks/useIcone";

export default function Details_page() {
  const nav = useNavigate();
  const location = useLocation();
  const { user } = useAuthContext();
  const [info, setInfo] = useState<{
    name: string | undefined;
    src: string | null;
  }>({
    name: undefined,
    src: null,
  });
  // const { data_type } = location.state;

  function edit_handel() {
    // nav(`/update/${data_type}`, { state: location.state });
  }

  function on_close() {
    nav(-1);
  }
  const { pathname } = location;
  const [infoType, id] = pathname.replace("/details/", "").split("/");
  useEffect(() => {
    switch (infoType) {
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
  }, []);

  const { name, src } = info;
  return (
    <main>
      <DetailsCard
        icone={src ? src : ""}
        title={name ? name : "Details"}
        close_on_click={on_close}
        edit_btn={true}
        edit_btn_click={edit_handel}
        delete_btn={false}
        save_btn={false}
        sumit_btn={false}
      >
        <Outlet />
      </DetailsCard>
    </main>
  );
}
